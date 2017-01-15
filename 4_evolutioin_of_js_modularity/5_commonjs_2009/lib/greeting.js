var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

var sayHello = function (lang) {
    return helloInLang[lang];
}

module.exports.sayHello = sayHello;
