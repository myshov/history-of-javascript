(function(define) {

    define(function (require, exports, module) {
        var helloInLang = {
            en: "Hello world!",
            es: "Hola mundo!",
            ru: "Привет мир!"
        };

        return {
            sayHello: function (lang) {
                return helloInLang[lang];
            }
        };
    });

}( // Help Node out by setting up define.
    typeof module === 'object' && module.exports && typeof define !== 'function' ?
    function (factory) { module.exports = factory(require, exports, module); } :
    define
));
