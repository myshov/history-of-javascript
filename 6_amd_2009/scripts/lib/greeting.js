define(function() {
    var helloInLang = {
        en: 'Hello world!',
        es: '¡Hola mundo!',
        ru: 'Привет мир!'
    };

    return {
        sayHello: function (lang) {
            return helloInLang[lang];
        }
    };
});
