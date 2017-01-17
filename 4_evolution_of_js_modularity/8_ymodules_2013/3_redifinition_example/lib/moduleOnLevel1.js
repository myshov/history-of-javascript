modules.define('greeting', function(provide) {
    provide({
        helloInLang: {
            en: 'Hello world!',
            es: '¡Hola mundo!',
            ru: 'Привет мир!'
        },
        sayHello: function (lang) {
            return this.helloInLang[lang];
        }
    });
});
