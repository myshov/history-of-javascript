require.config({
    baseUrl: 'scripts'
});

define(['./lib/greeting'], function(greeting) {
    var phrase = greeting.sayHello('en');
    document.write(phrase);
});
