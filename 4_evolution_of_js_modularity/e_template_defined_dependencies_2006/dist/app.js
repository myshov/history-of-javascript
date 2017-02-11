 /* ../lib/main.js begin */
var app = {};

/* ../lib/main.js end */


 /* ../lib/helloInLang.js begin */
app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

/* ../lib/helloInLang.js end */


 /* ../lib/writeHello.js begin */
app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};

/* ../lib/writeHello.js end */

