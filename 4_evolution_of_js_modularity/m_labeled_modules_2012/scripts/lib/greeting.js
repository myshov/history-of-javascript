var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

exports: var greeting = {
    sayHello: function (lang) {
        return helloInLang[lang];
    }
};
