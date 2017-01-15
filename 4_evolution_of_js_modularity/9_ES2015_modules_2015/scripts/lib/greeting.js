const helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

export const greeting = {
    sayHello: function (lang) {
        return helloInLang[lang];
    }
};
