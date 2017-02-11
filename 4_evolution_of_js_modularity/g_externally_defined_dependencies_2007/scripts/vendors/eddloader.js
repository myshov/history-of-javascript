(function (window, document) {
    var EDD = window.EDD = {};
    EDD._resolvingStatus = {};
    EDD.STATE_RESOLVING = 'resolving';
    EDD.STATE_RESOLVED = 'resolved';

    function loadScript(file) {
        var filePath = EDD._path ? EDD._path + '/' + file : file;
        var scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', filePath);
        scriptElement.setAttribute('async', false);
        document.body.appendChild(scriptElement);
    }

    function resolveDependencies(file) {
        var currentDepsList = EDD._deps.files[file];
        if (!Array.isArray(currentDepsList)) {
            throw Error('List of dependencies must be an array, got ' +
                        typeof currentDepsList + ' ' + currentDepsList);
        }
        if (EDD._resolvingStatus[file]) {
            return;
        }
        EDD._resolvingStatus[file] = EDD.STATE_RESOLVING;
        if (currentDepsList.length > 0) {
            currentDepsList.forEach(function (file) {
                resolveDependencies(file);
            })
        }
        loadScript(file);
        EDD._resolvingStatus[file] = EDD.STATE_RESOLVED;
    }

    function getEDDLoaderScriptTag() {
        var scripts = document.querySelectorAll('script');

        var loaderTag = Array.prototype.find.call(scripts, function (script) {
            return script.hasAttribute('data-edd-deps');
        });

        if (!loaderTag) {
            throw Error('Can\'t find a eddloader script tag with attribute data-edd-deps')
        }

        return loaderTag;
    }

    function prepareResolving(response) {
        EDD._deps = JSON.parse(this.responseText);
        Object.keys(EDD._deps.files).forEach(function (file) {
            resolveDependencies(file);
        });
    }

    function loadDepsFile() {
        var depsFilePath = EDD._path ? EDD._path + '/' + EDD._depsFile : EDD._depsFile;
        var xhrObj = new XMLHttpRequest();
        xhrObj.addEventListener("load", prepareResolving);
        xhrObj.open('GET', depsFilePath);
        xhrObj.send();
    }

    function init() {
        var EDDLoaderTag = getEDDLoaderScriptTag();
        EDD._path = EDDLoaderTag.getAttribute('data-edd-path');
        EDD._depsFile = EDDLoaderTag.getAttribute('data-edd-deps');
        loadDepsFile();
    }

    init();
})(window, document);
