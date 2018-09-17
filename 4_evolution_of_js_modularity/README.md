# The Evolution of JavaScript Modularity

When [Brendan Eich](https://github.com/BrendanEich) was designing the first version of JavaScript, he probably had no idea how his project will evolve during the last twenty years. At the moment there are already six major releases of specification of the language and work on its improvement still continues.

Let's be honest, JavaScript has never been the perfect programming language. One of the weaknesses of JS was modularity, to put it more clear, its absence. Indeed why do you need to care about isolation of the code and dependencies, when you use scripting language only for animations of the falling snowflakes on the page or for the form validation, when everything can live and interact in the same global scope?

With the time JavaScript has transformed into a general purpose language, as it began to be used to build a complex applications in the various environments (browser, mobile, server, IoT). The old approaches of the interaction of components of the program through the global scope became unreliable, because the increasing amount of the code tend to make your application too fragile. That is why for simplification of creation JavaScript applications there were created various realizations of modularity.

In this article, which is a result of communication with members of TC39, the developers of the different frameworks, reading source code, blogs and books, we will look at the following approaches/formats: Namespace, Module, Detached Dependency Definitions, Sandbox, Dependency Injection, CommonJS, AMD, UMD, Labeled Modules, YModules, ES2015 Modules. And meanwhile we will restore historical context of their emergence.

## Table of Contents

1. [Table of Contents](#table-of-contents)
2. [Defining the Used Terms](#defining-the-used-terms)
3. [A Little More About Problems](#a-little-more-about-problems)
    - [The Name Collision](#the-name-collision)
    - [The Support for Large Codebases](#the-support-for-large-codebases)
4. [Directly Defined Dependencies (1999)](#directly-defined-dependencies-1999)
5. [The Namespace Pattern (2002)](#the-namespace-pattern-2002)
6. [The Module Pattern (2003)](#the-module-pattern-2003)
7. [Template Defined Dependencies (2006)](#template-defined-dependencies-2006)
8. [Comment Defined Dependencies (2006)](#comment-defined-dependencies-2006)
9. [Externally Defined Dependencies (2007)](#externally-defined-dependencies-2007)
10. [The Sandbox Pattern (2009)](#the-sandbox-pattern-2009)
11. [Dependency Injection (2009)](#dependency-injection-2009)
12. [CommonJS Modules (2009)](#commonjs-modules-2009)
13. [AMD (2009)](#amd-2009)
14. [UMD (2011)](#umd-2011)
15. [Labeled Modules (2012)](#labeled-modules-2012)
16. [YModules (2013)](#ymodules-2013)
17. [ES2015 Modules (2015)](#es2015-modules-2015)
18. [Conclusion](#conclusion)

## Defining the Used Terms

The modularity solves [next issues](http://blog.calyptus.eu/seb/2011/10/choosing-a-javascript-module-syntax/): code isolation, dependency definition between modules, and delivering of the code into execution environment. Some approaches solved only one or two issues, we will name this solutions as "patterns". Some approaches solved all of three, we will name them as “module systems”.

We will name particular structure of the source code with definitions of exported entities (objects, functions etc.) and definitions of imported entities as "module format".

The "Detached Dependency Definition" (DDD for short) means such approaches of describing dependencies which can be used independently from the module systems.

## A Little More About Problems

Before delve into the world of modularity let’s take a closer look at the problems which we will try to solve.

### The Name Collision

From the moment of its appearance JavaScript has used the global object window as a storage for all variables defined without the `var` keyword. In 1995-1999 it was very convenient, because JavaScript code tended to solve small tasks that hadn't required a lot of lines of code. But when the codebase of applications had became large this feature of the language began to lead to nasty errors because of the name collisions. Let’s look at this example:

```JavaScript
// file greeting.js
var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

function writeHello(lang) {
    document.write(helloInLang[lang]);
}

// file hello.js
function writeHello() {
    document.write('The script is broken');
}
```

When we place the script `greeting.js` on the page and after it `hello.js` there will be conflict, that is instead of the greeting we will get the message "The script is broken" in this particular case.

It is obvious that in the large projects this can cause a lot of headaches. Moreover you cannot be sure that the third-party scripts on the page won't break anything in your app.

### The Support for Large Codebases

An another inconvenient moment of JavaScript for the building of large applications is the need to explicitly specify a plugged-in scripts using the `script` tag in the most common ES5 browser environments.

If you care about the fact that the source code of application should be maintainable, then you need to split it into independent parts. Because of this the amount of the files may be a really large. With a large number of files the manual control of the scripts (i.e. the placing scripts on the page via the script tag) becomes very tedious, because firstly you have to remember to put necessary scripts in the page and secondly preserve the proper order of the `script` tags so that all dependencies between files has been resolved.

## Directly Defined Dependencies (1999)

The first attempt to bring the structure of the modules into JavaScript and the first implementation of the detached dependency definition was pattern "Directly Defined Dependencies". This pattern firstly was [used](https://twitter.com/erikarvidsson/status/825403889969033216) by [Erik Arvidsson](https://github.com/arv) (member of TC39 at the present moment) in 1999 year.

At that time Erik worked at a startup developing a platform for running gui applications in a browser, it was called WebOS (note that this is not webOS, which was developed by Palm). WebOS was a proprietary platform, so I did not manage to get its source code. Therefore we look at the implementation of this pattern using Dojo Toolkit, which was developed by [Alex Russell](https://github.com/slightlyoff) and [Dylan Schiemann](https://github.com/dylans) in 2004.

The gist of directly defined dependencies lied in the getting of the code of the modules (in terms of the Dojo - resources) via explicit invocation of the function `dojo.require` (which is also used to initialise the loaded module). That is in this approach the dependencies were defined directly in the code at those places, where they should to be used.

Let's revise our example using Dojo 1.6:

```JavaScript
// file greeting.js
dojo.provide("app.greeting");

app.greeting.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

app.greeting.sayHello = function (lang) {
    return app.greeting.helloInLang[lang];
};

// file hello.js
dojo.provide("app.hello");

dojo.require('app.greeting');

app.hello = function(x) {
    document.write(app.greeting.sayHello('es'));
};
```

Here we see that modules are defined using the function `dojo.provide`, and the process of getting of the code of the module starts when you use `dojo.require`. It is a fairly simple approach that was used in the Dojo up to version 1.7; Google Closure Library uses it to this day.

## The Namespace Pattern (2002)

For solving the issue with name collisions you may use special code conventions. For example you can add particular prefix to all variables and functions: `myApp_`: myApp_address, myApp_validateUser(). Also you can use the fact that functions in JavaScript are first class citizens, i.e. you can assign them to variables, to properties of objects and return them from other functions. Therefore you can create objects with properties-methods  similar to objects document and window  (document.write(), window.alert()).

The first significant project that took advantage of this opportunity was a library of ui elements Bindows. Bindows was created by already familiar to us Erik Arvidsson in 2002. Instead of using prefixes in the name of functions and variables, he used a global object whose properties contained the data and logic of the library. That fact has greatly reduced the pollution of the global scope. The pattern for that code organisation is known now as the "namespace" (the Namespace Pattern).

If we apply this idea to our example we get something like this:

```JavaScript
// file app.js
var app = {};

// file greeting.js
app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

// file hello.js
app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};
```

As we can see the logic and the data resides now in the properties of the object `app`. Thus we don't pollute the global scope but continue to have access to the various parts of the application from different files.

The Namespace Pattern is probably the most known pattern in JavaScript nowadays. The Bindows was the first but after it there was a lot of other frameworks and libraries which organised logic that way for example Dojo (2005), YUI (2005). Also it should be noted that Erik does not consider himself as the author of this pattern, but [he couldn’t remember](https://twitter.com/erikarvidsson/status/819368206984826880) particular project he was inspired by.

## The Module Pattern (2003)

The Namespace gave some sort of order to the code organisation. But it was evident that it’s not enough, as there was no solution for the isolation of code and data yet.

The pioneer in the solution of this problem is the Module pattern. Its main idea is encapsulating data and code with a closure and providing access to them through methods accessible from the outside. Here is a basic example of this type of pattern:

```JavaScript
var greeting = (function () {
    var module = {};

    var helloInLang = {
        en: 'Hello world!',
        es: '¡Hola mundo!',
        ru: 'Привет мир!'
    };

    module.getHello = function (lang) {
        return helloInLang[lang];
    };

    module.writeHello = function (lang) {
        document.write(module.getHello(lang))
    };
    
    return module;
}());
```

Here we see the immediately invoked function, which returns a module object, which in turn has a method `getHello` that accesses the object `helloInLang` through the closure. Thus `helloInLang` becomes inaccessible from the outside world and we get an atomic piece of code that can be pasted into any other script without the name collision.

The first use of this approach in the wild was seen in 2003, when Richard Cornford gave an [example](https://groups.google.com/forum/#!msg/comp.lang.javascript/eTzWVa1W_pE/N9lnvRG9WJ8J) of this pattern in the group comp.lang.javascript to illustrate the use of closures. In 2005-2006, the developers of the YUI framework from Yahoo! under the leadership of Douglas Crockford took this approach for their project. But the greatest impetus to its spread was given in 2008 by Douglas, when he described the "Module" in his book JavaScript the Good Parts.

Also there is a good article [JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html). It describes a lot of various ways of implementation of the Module. I recommend to look at it.

## Template Defined Dependencies (2006)

Template defined dependencies is the next pattern in the family of the detached dependency definitions. I was able to find the earliest use of this approach in library [Prototype 1.4](https://github.com/myshov/history-of-javascript/blob/master/old_libs/prototype-1.4.0/src/prototype.js) (2006). But I have a suspicion that this approach was used in the earlier versions of the library also. (If you have access to the earlier versions of prototype let me know).

The development of Prototype started in 2005 by [Sam Stephenson](https://github.com/sstephenson). Prototype was the integral part of Ruby on Rails at that time. Because Sam worked a lot with ruby it is not surprising that for the management of the dependencies he had chosen simple erb templates.

If we try to generalize we can say, that this pattern defines dependencies via inclusion into the target file the special labels. The resolving this labels into actual code can be performed via templating (erb, jinja, smarty), and special build tools, for example, borshik. In contrast to the previous discussed detached dependency definitions patterns, this pattern only works with pre-build step.

Let’s transform our example using this style of dependency definition. For that we will use [borshik](https://github.com/borschik/borschik).

```JavaScript
// file app.tmp.js

/*borschik:include:../lib/main.js*/

/*borschik:include:../lib/helloInLang.js*/

/*borschik:include:../lib/writeHello.js*/

// file main.js
var app = {};

// file helloInLang.js
app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

// file writeHello.js
app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};
```

In the example file app.tmp.js defines the plugged-in scripts and their order. If you will ponder about this example it will be clear that this approach does not fundamentally changes the life of the developer. Instead of using `script` tags you just start to use other labels in js file. Thus we can still forget something or screw up the order of the plugged-in scripts. Therefore the main purpose of this approach is a creating a single file from many other scripts.

## Comment Defined Dependencies (2006)

The comment defined dependencies pattern is also subtype of the detached dependency definitions family. It is very similar to directly defined dependencies, but in this case instead of using some sort of functions we use comments which include the information about all dependencies of the particular module.

An application that use this pattern must be either pre-built (this approach was used in 2006 for [MooTools](https://github.com/mootools/mootools-core/blob/41b0bdedce3adeb921c181145d7c79a8ecbf4763/Plugins/Fxpack.js#L12) which was created by [Valerio Proietti](https://github.com/kamicane)), or dynamically parse downloaded code and resolve dependencies at the runtime. The last approach was used in [LazyJS](https://github.com/bevacqua/lazyjs) which was created by [Nicolás Bevacqua](https://github.com/bevacqua).

Our example will be look like this, if we will rewrite it using this library:

```JavaScript
// file helloInLang.js
var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

// file sayHello.js

/*! lazy require scripts/app/helloInLang.js */

function sayHello(lang) {
    return helloInLang[lang];
}

// file hello.js

/*! lazy require scripts/app/sayHello.js */

document.write(sayHello('en'));
```

In a nutshell how the library works. When library downloads files it parses their contents, finds the corresponding comments with dependencies, and eventually downloads them (dependencies), repeating the process of parsing of the downloaded files.

The most well known library which uses this approach MooTools. LazyJS was an interesting experiment but due to the reason that its emergence happened after CommonJS and AMD, LazyJS didn’t get a big attention of developers.

## Externally Defined Dependencies (2007)

Let’s look at the last pattern in the family of DDD. In the externally defined dependencies pattern all dependencies are defined outside of the main context, for example in a configuration file or in a code as an object or an array with the list of dependencies. However there is a phase of preparing. The application during this phase initialises itself with loading all dependencies in the correct order.

The earliest using of this approach, that I managed to find, dates by 2007 in [MooTools 1.1](https://github.com/mootools/mootools-core/blob/d4b15bdd4061d7012748bc2c9da7e70864e12bbb/scripts.json#L14).

In the simplest case our example with using this pattern can be done like this (for this example I will use my own [experimental loader](https://github.com/myshov/eddloader) that use this pattern).

```JavaScript
// file deps.json
{
    "files": {
        "main.js": ["sayHello.js"],
        "sayHello.js": ["helloInLang.js"],
        "helloInLang.js": []
    }
}

// file helloInLang.js
var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

// file sayHello.js
function sayHello(lang) {
    return helloInLang[lang];
}

// file main.js
console.log(sayHello('en'));
```

File `deps.json` is the external context in which you define all dependencies. When you run the application the loader receives this file, reads the list of all dependencies that are defined as an array, and then loads and puts them to the page in the correct order.

Nowadays this approach is used in libraries for creating the custom builds. For example such approach uses [lodash](https://github.com/lodash-archive/lodash-cli/blob/master/lib/mapping.js#L386-L1022).

## The Sandbox Pattern (2009)

The developers at Yahoo, who worked on the new module system in YUI3, was solving the problem of using different versions of the library on one page. Prior YUI3 module system of the framework has been implemented using combination of the Module pattern and Namespace. It’s obvious that by using this approach top-level object which contained code of the library could only be one, and therefore simultaneous using of multiple versions of the library was really difficult.

[Adam Moore](https://twitter.com/admo) (one of the developers of YUI3) suggested to use "Sandbox" for a solution to this problem. A simple implementation of modularity using this pattern may look like this:

```JavaScript
// file sandbox.js
function Sandbox(callback) {
    var modules = [];

    for (var i in Sandbox.modules) {
        modules.push(i);
    }

    for (var i = 0; i < modules.length; i++) {
        this[modules[i]] = Sandbox.modules[modules[i]]();
    }
    
    callback(this);
}

// file greeting.js
Sandbox.modules = Sandbox.modules || {};

Sandbox.modules.greeting = function () {
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
};

// file app.js
new Sandbox(function(box) {
    document.write(box.greeting.sayHello('es'));
});
```

The essence of this approach is that instead of the global object you use a global constructor. The modules can be defined as properties of this constructor.

The "Sandbox" is an interesting solution to the problem of modularity, but besides of YUI3 this pattern didn’t get a lot of attention. If you want to know more about the Sandbox I recommend the article the [Javascript Sandbox Pattern](https://www.kenneth-truyers.net/2016/04/25/javascript-sandbox-pattern/), and the official YUI documentation about [the creation of new modules](https://yuilibrary.com/yui/docs/yui/create.html) of the library.

## Dependency Injection (2009)

In 2004 Martin Fowler introduced the concept of "[dependency injection](https://martinfowler.com/articles/injection.html)" (DI) for the description of the new mechanism of communication the components in Java. The gist is that all dependencies come from outside of the component, therefore the component is not responsible for initialisation its dependencies it only uses them.

Five years later [Miško Hevery](https://github.com/mhevery) a former employee of Sun and Adobe (where he was mainly engaged in development on Java) began to design for his startup a new JavaScript framework, which used dependency injection as the key mechanism of the communication between components. The business idea has not proved its effectiveness, and source code of the framework was opened and introduced to the world at the domain of his startup getangular.com. We all know what happened next. Google has taken under its wing Miško and his project, and now Angular is one of the most known JavaScript frameworks.

Modules in Angular are implemented via the mechanism of Dependency Injection. By the way the modularity is not the primary purpose of DI, about this also clearly Miško says in the answer to [the corresponding question](http://www.alexrothenberg.com/2013/02/11/the-magic-behind-angularjs-dependency-injection.html#comment-806114100).

To illustrate this approach, let's rewrite our example using the first version of Angular (yes, bear in mind that this example is extremely synthetic):

```JavaScript
// file greeting.js
angular.module('greeter', [])
    .value('greeting', {
        helloInLang: {
            en: 'Hello world!',
            es: '¡Hola mundo!',
            ru: 'Привет мир!'
        },

        sayHello: function(lang) {
            return this.helloInLang[lang];
        }
    });

// file app.js
angular.module('app', ['greeter'])
    .controller('GreetingController', ['$scope', 'greeting', function($scope, greeting) {
        $scope.phrase = greeting.sayHello('en');
    }]);
```

If you will open the page with this example in the browser, then the code will run [magically](http://www.alexrothenberg.com/2013/02/11/the-magic-behind-angularjs-dependency-injection.html) and you will see the result on the page.

At the moment the dependency injection is a key mechanism in such frameworks as [Angular 2](https://github.com/angular/angular) and [Slot](https://github.com/2gis/slot). There are also a large number of libraries that simplify the use of this approach in applications that don’t depend on any framework.

## CommonJS Modules (2009)

Along with the client-side JavaScript engines (in the browsers) even before Node.JS there were [platforms for server-side development](https://en.wikipedia.org/wiki/Comparison_of_server-side_JavaScript_solutions) with JavaScript as the primary language. The server solutions due to the absence of appropriate specifications did not provided a unified API for communication with operating system and an its environment (file system, network, environment variables, and so on), thus creating problems with the code distribution. For example, scripts written for the old Netscape Enterprise Server did not work in Rhino and vice versa.

The turning point occurred in 2009 when an employee of Mozilla [Kevin Dangoor](https://github.com/dangoor) published a [post](http://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/) about the problems with server-side JavaScript with a call to all interested to join an informal Committee to discuss and develop server-side JavaScript API that was called ServerJS. Half a year later ServerJS was renamed to CommonJS because of new concepts that started to be part of the discussions.

Work had begun to boil. The most attention from developers and researchers has been given to [specification](http://www.commonjs.org/specs/modules/1.0/) of the modules - CommonJS Modules (sometimes referred to as CJS or just CommonJS), which eventually was implemented in Node.JS.

As an example of the CommonJS module let's adapt our module by this way:

```JavaScript
// file greeting.js
var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

var sayHello = function (lang) {
    return helloInLang[lang];
}

module.exports.sayHello = sayHello;

// file hello.js
var sayHello = require('./lib/greeting').sayHello;
var phrase = sayHello('en');
console.log(phrase);
```

Here we see that for implementation of modularity there are two new entities - `require` and `module` that provide the ability to load a module and to export its interface to the outer world. It is worth noting that neither require nor module are some sort of keywords of the language. In Node.JS we can use them due to the auxiliary function. This function wraps every module before sending it to the JavaScript engine:

```JavaScript
(function (exports, require, module, __filename, __dirname) {
    // ...
    // Your code injects here!
    // ...
});
```

The CommonJS specification defines only required minimum for the module interoperability in the different environments. It means that CommonJS is open for an extension. For example Node.JS uses this feature by adding property `main` to the `require` function, which points to the `module` if the file that consists this module was executed directly.

Babel also extends `require` during the transpilation of ES2015 Modules (I will talk about this module system in the end of this article) with default export:

```JavaScript
export default something;
```

Babel transforms such an export into CommonJS module, where default value is exported with corresponding property. Simply speaking you can get something like this as result of transpilation:

 

```JavaScript
export.default = something;
```

The bundler Webpack also uses various extensions, for example `require.ensure`, `require.cache`, `require.context`, but their discussion is outside of the context of this article.

CommonJS is the most common module format at the present moment. You can use it not only on the server-side in Node.JS but also on the client-side using [Browserfiy](http://browserify.org/) or [Webpack](https://webpack.js.org/), which can transform set of CommonJS modules into one bundle.

## AMD (2009)

The work on the CommonJS specification has been in full swing, and meanwhile there were [discussions](https://groups.google.com/forum/#!msg/commonjs/nbpX739RQ5o/SdpVQDtx88AJ) in the mailing list about adding into the specification the possibility of asynchronous loading for the modules. The main motivation lied in the fact that this will help to speed up the loading of web applications without some sort of pre-bundling.

The colleague of Kevin another developer from Mozilla [James Burke](https://github.com/jrburke) was one of the most active defenders of asynchronous modularity in all that discussions. James at that time could be an expert, as he was the author of the asynchronous modular system in Dojo Framework 1.7 and also he was developing a loader require.js since 2009.

The basic idea, which James tried to clarify was the fact that loading of the modules should not be synchronous (i.e. loading of the modules one by one in succession); we must use the browser functionality for the parallel loading of the scripts. For implementation of all requirements James had proposed his own format which was called AMD (Asynchronous Module Definition).

If we will rewrite our example using AMD format we will get something like this:

```JavaScript
// file lib/greeting.js
define(function() {
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

// file hello.js
define(['./lib/greeting'], function(greeting) {
    var phrase = greeting.sayHello('en');
    document.write(phrase);
});
```

The file hello.js is the entry point of the program. In this file there is a function `define` that declares a module. The first argument of the function is an array of dependencies. The execution of the code of the module, which is defined as a function in the second argument of `define`, will be launched only after that fact when all dependencies of this module will be loaded. This deferred code execution of the module makes a possibility for the parallel loading of its dependencies.

In 2011 there was the turning point of all this discussions, when James announced the creation of a separate mailing list for coordination all works on AMD, because consensus with the CommonJS group for all this time [had not been reached](https://groups.google.com/forum/#!msg/commonjs/6CdQpDW4loE/Syh_gxvQ5QUJ). 

By personal observations I can say that AMD is still relevant for developing of client side applications, however the tendency for the distribution of client-side libraries via npm leads away developers from AMD more and more.

## UMD (2011)

The evident confrontation of module formats began even before when AMD was separated from CommonJS Modules. Already at that time the AMD camp had a lot of developers who liked the minimal entry threshold to the working with modular code. The number of supporters of CommonJS Modules also grew very quickly due to the growing popularity Node.JS and the emergence of Browserify.

So there were two formats, which could not get along with each other. AMD modules couldn't be used in the environments that implements the specification of CommonJS Modules without the code modification. CommonJS modules could not be used with loaders which used AMD as main format (require.js, curl.js) also. It was a bad situation for whole JavaScript ecosystem. 

UMD format has been developed for solution of this problem. UMD stands for [Universal Module Definition](https://github.com/umdjs/umd), so this format allows you to use the same module with AMD tools as well as in CommonJS environments.

It was quite difficult to find the original author of this format, so I had to do an investigation. To begin, I turned to the author of UMD repository on GitHub [Addy Osmani](https://github.com/addyosmani), who in turn told me about James Burke and [Kris Kowal](https://github.com/kriskowal). This guys pointed out to [the Q’s repository](https://github.com/kriskowal/q) the first implementation of promises in JavaScript.

Since its inception, the Q library worked in different environments: in the browser (when you put the module on the page via the script tag) and on server-side in Node.JS and Narwhal (CommonJS Modules). James after some time had added the support of AMD into Q. And then Addy had gathered similar patterns in a single repository, which was named UMD. Such a result of adaptation of the code for different module systems is called UMD now.

As an example let's refactor our module greeting.js for the simultaneous support of different environments CommonJS and AMD:

```JavaScript
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
```

In the heart of this implementation pattern lies the immediately invoked function expression. That function takes different arguments depending on the environment. The passed argument is the following function if the code is used as a CommonJS module:

```JavaScript
function (factory) {
    module.exports = factory();
} 
```

If the code is used as an AMD module, the argument of function is `define`. Due this substitution the code can be used in different environments.

Now UMD is such a format that is used by most developers when they need to be able to use their module in the browser or in Node.JS. Many popular libraries support the export into UMD format for example [moment.js](https://github.com/moment/moment/blob/develop/templates/default.js) and [lodash](https://github.com/lodash-archive/lodash-cli/blob/0f68a3195aa37eca8ab13ce2d53ec4bb310edaf1/lib/listing.js#L49-L52).

## Labeled Modules (2012)

Since 2010 TC39 Committee started to work on a new native module system for JavaScript, which was named ES6 Modules at that time. By 2012 it was clear which final look it will take. One of the members of committee [Sebastian Markbåge](https://github.com/sebmarkbage) (also lead developer of React at this moment) had prepared an transitive module format by his own initiative. It was assumed that this format could be used even in ES3 environments and then easily adapted for the new module system. This format was named [Labeled Modules](https://github.com/sebmarkbage/labeled-modules-spec/wiki).

The main idea of this format lies in using of [labels](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). The keywords "import" and "export" is reserved in the language, so they couldn’t be used for labels. Therefore the corresponding synonymous was taken for this purpose. The label "exports" was used for export and the label “require” was used for import.

As always let’s rework our example to show this format in action.

```JavaScript
// file greeting.js
var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

exports: var greeting = {
    sayHello: function (lang) {
        return helloInLang[lang];
    }
};

// file hello.js
require: './lib/greeting';
var phrase = greeting.sayHello('es');
document.write(phrase);
```

The example of the config for building of application using Labeled Modules you can take [here](https://github.com/myshov/history-of-javascript/blob/master/4_evolution_of_js_modularity/m_labeled_modules_2012/webpack.config.js).

As we can see, it was a really elegant solution. But due to the fact that in 2012 CommonJS and AMD were a really popular choice for the most developers, the new format couldn't overcome that tough competition. Even though the support of this format [had appeared](https://webpack.github.io/docs/api-in-modules.html) in the first version of webpack, this format had not got a lot of attention in JavaScript community nonetheless.

## YModules (2013)

YModules is a module system that was created at Yandex for solutions of the tasks that neither CommonJS, nor AMD couldn’t solve. There were main requirements for this module system. First is the using of modules with asynchronous nature as transparent as possible, second is the possibility for the redefinition of modules. First requirement was important for implementation of asynchronous API, for example of Yandex.Maps, second was important due to the need of using modules at [levels of definitions in BEM](https://en.bem.info/methodology/key-concepts/#redefinition-level).

The teams of Yandex.Maps and BEM had created the specification for the new module system in 2013. And then it was implemented by [Dmitry Filatov](https://github.com/dfilatov).

Here is the implementation of our example using [YModules](https://github.com/ymaps/modules):

```JavaScript
// file greeting.js
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

// file app.js
modules.require(['greeting'], function(greeting) {
    document.write(greeting.sayHello('ru'));
});
// Result: "Привет мир!"
```

YModules by its structure heavily resembles AMD, but it’s main difference of YModules is an exposing of interface of the module to the consumers via special function `provide` rather than with `return` as in AMD.

This feature allows you to do `provide` from the blocks of an asynchronous code, that is it allows to hide the asynchronous nature of the module from the outside world. For example if we will add into our greeting.js some asynchronous logic (e.g. `setTimeout`) then the whole code using this module will remain untouched:

```JavaScript
// file greeting.js
modules.define('greeting', function(provide) {
    // postpone of code execution for 1 second
    setTimeout(function () {
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
    }, 1000);
});

// file: app.js
modules.require(['greeting'], function(greeting) {
    document.write(greeting.sayHello('ru'));
});
// result: "Привет мир!"
```

As it was said earlier, the main trait of YModules is the possibility of its using with levels of definitions of BEM. Let’s check out how we can to use this feature.

```JavaScript
// file moduleOnLevel1.js
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

// file moduleOnLevel2.js
modules.define('greeting', function(provide, module) {
    // redeclaring of sayHello method
    module.sayHello = function (lang) {
        return module.helloInLang[lang].toUpperCase();
    };
    provide(module);
});

// file app.js
modules.require(['greeting'], function(greeting) {
    document.write(greeting.sayHello('ru'));
});
// Result: "ПРИВЕТ МИР!"
```

If you run this example, then as the result of redefining the `greeting` module the 'sayHello` method will be changed to the new one, and the text of the output message will be converted to uppercase. This is possible due to the fact that in YModules when the module is defined once again, its last argument will contain the previous version of the module.

At the moment YModules is used in the various projects in Yandex. Also it's a main module system in the framework [i-bem.js](https://en.bem.info/platform/i-bem/).

## ES2015 Modules (2015)

Of course the Committee TC39 was watching what was happening in JavaScript world. It was obvious that the time has come for major changes in the language.

The work on the modular system [started](http://wiki.ecmascript.org/doku.php?id=harmony:modules&rev=1300916920) in 2010. The design of this system was created by [Dave Herman](https://github.com/dherman) and [Sam Tobin-Hochstadt](https://github.com/samth/). The work continued in the period of five years. The final design of the [module system](http://www.ecma-international.org/ecma-262/6.0/#sec-modules) has been released with specification ES2015.

By tradition, let's adapt our example to show the specification in action:

```JavaScript
// file lib/greeting.js
const helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

export const greeting = {
    sayHello: function (lang) {
        return helloInLang[lang];
    }
};

// file hello.js
import { greeting } from "./lib/greeting";
const phrase = greeting.sayHello("en");
document.write(phrase);
```

As we can see the standard introduces the brand new keywords for importing of modules using the keyword `import` and exporting of the code using the keyword `export`.

Due to the fact that we are dealing with [new keywords in the language](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/), and also because the Module Loader API specification, which is responsible for supporting loading modules in various environments, is not yet ready, we can't just pick up and start using the new native module system. 

In spite of this limitations a lot of projects have started to use the new format of the modules. To start use the new standard in a world where ES5 is most common, you can use the [Babel](https://github.com/babel/babel) transpilation, which is a fairly common practice.

## Conclusion

There are other approaches for the modularity in JS. Some of them can intertwine with each other [creating bizarre forms](http://requirejs.org/docs/api.html#cjsmodule), others were created specifically for using in a [particular project](https://github.com/Artificial-Engineering/lycheejs/blob/development/projects/pong/source/Main.js#L2-L6), and some were created as a [transitive format](https://github.com/ModuleLoader/es-module-loader/blob/v0.17.0/docs/system-register.md). Describing them all is a fairly non-trivial task, therefore the article has discussed only the most popular approaches and formats. Nevertheless, I think that this article has helped you to learn something new, to systematise the knowledge about modularity in JavaScript and to learn a little more about those people, who stood behind all these technologies.

