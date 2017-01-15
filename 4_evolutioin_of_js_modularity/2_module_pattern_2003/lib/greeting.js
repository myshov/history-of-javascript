var greeting = (function () {
    var module = {};
    var helloInLang = {
        en: 'Hello world!',
        es: '¡Hola mundo!',
        ru: 'Привет мир!'
    };

    module.getHello = function (lang) {
        return helloInLang[lang];
    };

    module.writeHello = function (lang) {
        document.write(module.getHello(lang))
    };

    return module;
}());
