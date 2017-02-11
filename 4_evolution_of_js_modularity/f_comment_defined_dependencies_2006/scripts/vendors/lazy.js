if(!String.prototype.trim){
    String.prototype.trim = function(){
        return this.replace(/^\s+|\s+$/g, '');
    };
}

!function(window,document){
    'use strict';

    var debug = function(){
        if(debug.enabled){
            console.log.apply(console, arguments);
        }
    };
    debug.enabled = false;

    var lazyjs = {
        ajaxGet: function(url, done){
            var xhr;

            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.open('GET', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(null);
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4) {
                    done(xhr, xhr.responseText);
                }
            };
        },
        debug: debug
    };

    window.lazyjs = lazyjs;
}(window,document);

!function(window){
    'use strict';

    var settings = {
            separator: ';'
        },
        cache = {},
        q = document.getElementById,
        lazyjs = window.lazyjs,
        ajax = lazyjs.ajaxGet,
        rdirective = /^\/\*! *lazy *([a-z]*) *([^ ]*) *\*\/$/img,
        define = 'define',
        require = 'require',
        execute = eval;

    function load(url, done){
        ajax(url, function(xhr, data){
            if(xhr.status !== 200){
                return done(new Error('could not fetch resource: ' + url));
            }

            parse(url, data);
            done();
        });
    }

    function loadSeries(links, done){
        var series = links.split(settings.separator),
            pending = series.length,
            failed = false;

        if(pending === 0){ // sanity
            return done();
        }

        for(var i = 0; i < pending; i++){
            load(series[i], loaded);
        }

        function loaded(err){
            if(err){
                failed = true;
                return done(err);
            }
            if(--pending === 0 && !failed){
                done(null);
            }
        }
    }

    function parse(url, data){
        var module;

        // split modules logically
        data.replace(rdirective, function(match, directive, value, offset){
            if(directive === define || !module){
                register(module, offset);
                create(match, directive, value, offset);
            }

            if(directive === require){
                module._require.push(value);
            }
        });

        if(!module){ // module has no dependencies and it's not explicitly declared either
            create();
        }

        register(module, data.length);

        function create(match, directive, value, offset){
            module = {
                _require: [],
                _parser: {
                    id: directive === define ? value : url,
                    data: data,
                    start: match ? offset + match.length : 0
                }
            };
        }
    }

    function register(module, end){
        if (module){
            module._parser.end = end;
            cache[module._parser.id] = module;
        }
    }

    function evaluate(module, done){
        if(module.resolved){
            return done();
        }

        var p = module._parser;
        
        lazyjs.debug('resolving ' + p.id + '...');

        lookupSeries(module._require, function(){
            var js = p.data.substr(p.start, p.end - p.start);

            execute(js);

            module.js = js;
            module.resolved = true;
            lazyjs.debug('resolved ' + p.id + '!');
            done();
        });
    }

    function lookup(url, done, nojax){
        if(url in cache){
            var module = cache[url];
            evaluate(module, done);
            return;
        }

        if(nojax !== true){
            load(url, function(){
                lookup(url, done, true);
            });
        }else{
            throw new Error('could not load resource: ' + url);
        }
    }

    function lookupSeries(dependencies, done){
        var pending = dependencies.length,
            failed = false;

        if(pending === 0){ // sanity
            return done();
        }

        for(var i = 0; i < pending; i++){
            lookup(dependencies[i], loaded);
        }

        function loaded(err){
            if(err){
                failed = true;
                return done(err);
            }
            if(--pending === 0 && !failed){
                done(null);
            }
        }
    }

    function init(){
        var tag = document.getElementById('lazyjs');
        var jumpstart = tag.getAttribute('data-jumpstart');
        if(!jumpstart){
            throw new Error('data-jumpstart attribute missing');
        }

        var bundle = tag.getAttribute('data-bundle');
        if (bundle){
            loadSeries(bundle, function(err){
                if(err){
                    throw err;
                }
                lookup(jumpstart, function(){});
            });
        }else{
            lookup(jumpstart, function(){});
        }
    }

    init();
}(window);
