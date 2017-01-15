var app = {};

app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};
