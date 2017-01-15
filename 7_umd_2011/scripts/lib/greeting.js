(function(define) {

    define(function () {
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

}(
    typeof module === 'object' && module.exports && typeof define !== 'function' ?
    function (factory) { module.exports = factory(); } :
    define
));
