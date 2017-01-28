modules.define('greeting', function(provide, module) {
    module.sayHello = function (lang) {
        return module.helloInLang[lang].toUpperCase();
    };

    provide(module);
});
