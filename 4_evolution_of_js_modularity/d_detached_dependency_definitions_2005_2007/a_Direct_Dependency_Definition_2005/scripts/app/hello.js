dojo.provide("app.hello");

dojo.require('app.greeting');

app.hello = function(x) {
    alert(app.greeting.sayHello('es'));
};
