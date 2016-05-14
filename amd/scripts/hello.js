require.config({
    baseUrl: 'scripts'
});

define(["./greeting"], function(greeting) {
    var phrase = greeting.sayHello("en");
    document.write(phrase);
});
