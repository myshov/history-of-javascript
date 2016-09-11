(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _greeting = require("./lib/greeting");

var phrase = _greeting.greeting.sayHello("ru");
document.write(phrase);

},{"./lib/greeting":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var helloInLang = {
    en: "Hello world!",
    es: "¡Hola mundo!",
    ru: "Привет мир!"
};

var greeting = exports.greeting = {
    sayHello: function sayHello(lang) {
        return helloInLang[lang];
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2hlbGxvLmpzIiwic2NyaXB0cy9saWIvZ3JlZXRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLElBQU0sU0FBUyxtQkFBUyxRQUFULENBQWtCLElBQWxCLENBQWY7QUFDQSxTQUFTLEtBQVQsQ0FBZSxNQUFmOzs7Ozs7OztBQ0hDLElBQU0sY0FBYztBQUNqQixRQUFJLGNBRGE7QUFFakIsUUFBSSxjQUZhO0FBR2pCLFFBQUk7QUFIYSxDQUFwQjs7QUFNTSxJQUFNLDhCQUFXO0FBQ3BCLGNBQVUsa0JBQVUsSUFBVixFQUFnQjtBQUN0QixlQUFPLFlBQVksSUFBWixDQUFQO0FBQ0g7QUFIbUIsQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZ3JlZXRpbmcgfSBmcm9tIFwiLi9saWIvZ3JlZXRpbmdcIjtcblxuY29uc3QgcGhyYXNlID0gZ3JlZXRpbmcuc2F5SGVsbG8oXCJydVwiKTtcbmRvY3VtZW50LndyaXRlKHBocmFzZSk7XG4iLCLvu79jb25zdCBoZWxsb0luTGFuZyA9IHtcbiAgICBlbjogXCJIZWxsbyB3b3JsZCFcIixcbiAgICBlczogXCLCoUhvbGEgbXVuZG8hXCIsXG4gICAgcnU6IFwi0J/RgNC40LLQtdGCINC80LjRgCFcIlxufTtcblxuZXhwb3J0IGNvbnN0IGdyZWV0aW5nID0ge1xuICAgIHNheUhlbGxvOiBmdW5jdGlvbiAobGFuZykge1xuICAgICAgICByZXR1cm4gaGVsbG9JbkxhbmdbbGFuZ107XG4gICAgfVxufTtcbiJdfQ==
