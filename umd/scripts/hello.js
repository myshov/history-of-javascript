require.config({
    baseUrl: 'scripts'
});

define(["./greeting"], function(greeting) {
    var phrase = greeting.sayHello("es");
    document.write(phrase);
});
