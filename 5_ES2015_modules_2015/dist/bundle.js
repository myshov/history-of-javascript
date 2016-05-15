(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var helloInLang = {
    en: "Hello world!",
    es: "Hola mundo!",
    ru: "Привет мир!"
};

var greeting = exports.greeting = {
    sayHello: function sayHello(lang) {
        return helloInLang[lang];
    }
};

},{}],2:[function(require,module,exports){
"use strict";

var _greeting = require("./greeting");

var phrase = _greeting.greeting.sayHello("ru");
document.write(phrase);

},{"./greeting":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2dyZWV0aW5nLmpzIiwic2NyaXB0cy9oZWxsby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUMsSUFBTSxjQUFjO0FBQ2pCLFFBQUksY0FEYTtBQUVqQixRQUFJLGFBRmE7QUFHakIsUUFBSTtBQUhhLENBQXBCOztBQU1NLElBQU0sOEJBQVc7QUFDcEIsY0FBVSxrQkFBVSxJQUFWLEVBQWdCO0FBQ3RCLGVBQU8sWUFBWSxJQUFaLENBQVA7QUFDSDtBQUhtQixDQUFqQjs7Ozs7QUNOUDs7QUFFQSxJQUFNLFNBQVMsbUJBQVMsUUFBVCxDQUFrQixJQUFsQixDQUFmO0FBQ0EsU0FBUyxLQUFULENBQWUsTUFBZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCLvu79jb25zdCBoZWxsb0luTGFuZyA9IHtcbiAgICBlbjogXCJIZWxsbyB3b3JsZCFcIixcbiAgICBlczogXCJIb2xhIG11bmRvIVwiLFxuICAgIHJ1OiBcItCf0YDQuNCy0LXRgiDQvNC40YAhXCJcbn07XG5cbmV4cG9ydCBjb25zdCBncmVldGluZyA9IHtcbiAgICBzYXlIZWxsbzogZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgICAgcmV0dXJuIGhlbGxvSW5MYW5nW2xhbmddO1xuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBncmVldGluZyB9IGZyb20gXCIuL2dyZWV0aW5nXCI7XG5cbmNvbnN0IHBocmFzZSA9IGdyZWV0aW5nLnNheUhlbGxvKFwicnVcIik7XG5kb2N1bWVudC53cml0ZShwaHJhc2UpO1xuIl19
