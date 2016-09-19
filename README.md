# Evolution of JavaScript Modularity

15-20 years ago there were "wonderful" times when developers weren't particularly concerned about how to structure their JavaScript code — the whole dynamics of the page was in a single file. With the increasing complexity of tasks, this file had divided into smaller logical parts, and all interaction occurred via global context. It had led to a large number of errors.

Now we have a lot of specs/patterns/API: CommonJS, AMD, UMD, ES2015 Modules. Their goal is to help organize code and solve the issue of pollution of the global scope. The developers are just starting to learn JS, often do not fully understand what is behind these acronyms, and often confuse by them.

The purpose of this article is to dot the i's and cross the t's to restore the historical context of the emergence and development of these decisions.


## The contents

- The contents
- Pattern "Module" (2003)
- CommonJS Modules (2009)
- AMD (2009)
- UMD (2011)
- ES2015 Modules (2015)
- Instead of a conclusion



## Pattern "Module" (2003)

In General, everything was bad and there should be something to do. A pioneer in the organization of the code was a pattern of "Module". Its idea is to encapsulate data and code with a closure and provide access through methods accessible from the outside.

Here's a basic example of such a module:

```JavaScript
var greetingLib = (function () {
    var module = {};
    var helloInLang = {
        en: "Hello world!",
        es: "¡Hola mundo!",
        ru: "Привет мир!"
    };

    module.getHello = function (lang) {
        return helloInLang[lang];
    };

    return module;
}());

console.log(greetingLib.getHello("ru"));
// > Привет мир!
```


Here we see immideatly invoked function, which returns a module object, which in turn has a method getHello() that accesses the object helloInLang through the closure. Thus helloInLang becomes inaccessible from the outside world and we get an atomic piece of code that can be pasted into any other script without the name collision.

The first use of this approach in the wild was seen in 2003, when Richard Cornford (Richard Cornford) gave [an example](https://groups.google.com/forum/#!msg/comp.lang.javascript/eTzWVa1W_pE/N9lnvRG9WJ8J) of the module in the group comp.lang.javascript to illustrate the use of closures. In 2005-2006, the developers of the YUI framework from Yahoo! under the leadership of Douglas Crockford's (Douglas Crockford) took this approach for their project. But the greatest impetus to its spread was given in 2008 when Douglas described the pattern of "Module" in his book JavaScript the Good Parts.


## CommonJS Modules (2009)

Interesting fact, along with client-side browsers JavaScript engines even before Node.JS there were [platforms for server-side development](https://en.wikipedia.org/wiki/Comparison_of_server-side_JavaScript_solutions) with JavaScript as the primary language. Server solutions in the absence of appropriate specifications had not provided a unified API to work with the operating system and the external environment (file system, network, environment variables, and so on), thus creating problems with the code distribution. For example, scripts written for the old Netscape Enterprise Server did not work in Rhino and vice versa.

In 2009, the turning point occurred when an employee of Mozilla Kevin Dangoor published a post about the problems with server-side JavaScript with a call to all interested to join an informal Committee to discuss and develop server-side JavaScript API that was called ServerJS (half a year later it [was renamed](http://www.commonjs.org/history/) to CommonJS).

Work has begun to boil. The most attention from developers and researchers have been given to specification of the modules - CommonJS Modules (sometimes referred to as CJS or just CommonJS), which eventually was implemented in Node.JS for modularity of the code.

As an example of the CommonJS module let's adapt the module from the previous example:

```JavaScript
// file lib/greeting.js
var helloInLang = {
    en: "Hello world!",
    es: "¡Hola mundo!",
    ru: "Привет мир!"
};

var sayHello = function (lang) {
    return helloInLang[lang];
}

module.exports.sayHello = sayHello;

// file hello.js
var sayHello = require("./lib/greeting").sayHello;
var phrase = sayHello("en");

console.log(phrase);

// > Hello world!
```


Here we see that the implementation of modularity introduced two new entity, `require` and `module` that provide the ability to download a module and to export the necessary methods. It is worth noting that neither `require` nor `module` are not keywords of the language. In Node.JS we can use this keywords due to the wrapper, which wrapped all the modules before sending them to the JavaScript engine:

```JavaScript
(function (exports, require, module, __filename, __dirname) {
    // ...
    // your code injected here
    // ...
});
```

By the way, after the appearance of Node.JS the Committee CommonJS has become less actively engaged in standards development. Ultimately, his work was completely stopped. But that's another story...


## AMD (2009)

When developing the specification of CommonJS was in full swing, in the newsletter from time to time there were [discussions](https://groups.google.com/forum/#!msg/commonjs/nbpX739RQ5o/SdpVQDtx88AJ) about adding into the specification the possibility of asynchronous loading of modules to speed up the loading of web applications and to eliminate the building of the code before delivery to users.

Colleague of Kevin, another developer from Mozilla, James Burke was one of the most active defenders asynchronous modularity in all that discussions. James at that time could be an expert, as he was the author of the asynchronous modular system in the Dojo Framework and also he was developing a loader [require.js](http://requirejs.org/) since 2009.

The basic idea, which James tried to clarify, was the fact that loading modules should not be synchronous (i.e. loading the modules one by one in series); you must use a browser functionality for the parallel loading of scripts.

For example, if we rewrite our example in accordance with the practices of AMD, we could get code like this:

```JavaScript
// file lib/greeting.js
define(function() {
    var helloInLang = {
        en: "Hello world!",
        es: "¡Hola mundo!",
        ru: "Привет мир!"
    };

    return {
        getHello: function (lang) {
            return helloInLang[lang];
        }
    }
});

// file hello.js
define(["./lib/greeting"], function(greeting) {
    var phrase = greeting.getHello(“en”);
    console.log(phrase);
});
```


Here the file `hello.js` is the entry point of the program. In this file there is a function `define` that declares a module. The first argument to the function is an array of dependencies. The execution of the main module code, which is defined as a function in the second argument of `define`, will be launched only after all dependencies of the module will be loaded. The deferred execution code of each module makes a possibility for the parallel loading of dependencies.

In 2011 came the turning point of all discussions, when James announced the creation of a separate mailing list for coordination of all works on AMD (Asynchronous Module Definition), as a consensus with the CommonJS group for all this time [had not been reached](https://groups.google.com/forum/#!msg/commonjs/6CdQpDW4loE/Syh_gxvQ5QUJ).


## UMD (2011)

In fact, the apparent opposition of the specifications began even before AMD was separated from CommonJS Modules. Already at that time the AMD camp had a lot of developers who liked the minimal entry threshold to start working with modular code. The number of adherents CommonJS Modules also grew very quickly due the growing popularity Node.JS and the emergence of Browserify.

Basically, we had two standards, which could not get along with each other: AMD modules without modifying the code couldn't be used in environments that implement the specification of CommonJS Modules Node.JS), and CommonJS modules could not be used in implementations of AMD (Require.js, curl.js). Noone liked that situation, and for solution of the problem of code portability between different systems modularity has been developed a pattern UMD - [Universal Module Definition](https://github.com/umdjs/umd).

It was quite difficult to find the original author of this pattern, so I had to do a some kind of investigation. To begin, I turned to the author of patterns of UMD repository on GitHub Addy Osmani, who in turn [led me](https://twitter.com/addyosmani/status/732834573340528640?replies_view=true&cursor=ABAXCjjOKwo) to James Burke and Kris Kowal, Kris and James told me about [Q](https://github.com/kriskowal/q) - first implementation of promises in JavaScript.

Since its inception, the library Q could work in different environments: in the browser (when you connect the module via the script tag) and on server-side in Node.JS and Narwhal (CommonJS Modules). James Burke after some time added support of AMD into Q. And then Addy Osmani have gathered similar patterns in a single repository, which was named UMD. Such a result of adaptation of the code for different modularity systems now is called UMD.

As an example, let's refactor our toy module `greeting.js` for simultaneous support of different environments CommonJS and AMD:

```JavaScript
(function(define) {

    define(function () {
        var helloInLang = {
            en: "Hello world!",
            es: "¡Hola mundo!",
            ru: "Привет мир!"
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


In the heart of this implementation pattern there is self invoked function. That function takes different arguments depending on the environment. The passed argument is the following function:

```JavaScript
function (factory) {
    module.exports = factory();
} 
```


— if the code is used as a CommonJS module. If the code is used as an AMD module, the argument of function is `define`. Due that substitution the code can be used under different environments.


## ES2015 Modules (2015)

ECMAScript Committee has been watching all that wild world of JavaScript. It was obvious that has come the time for major changes in the language.

Work on modular system [started in 2010](http://wiki.ecmascript.org/doku.php?id=harmony:modules&rev=1300916920) by Dave Herman the Director for strategic development at Mozilla. The work continued for five years, while Dave engaged in parallel with other tasks. During this time he managed to be in the role of architect, lead developer and developer in projects like asm.js, emscripten, rust, servo, and had written the book [Effective JavaScript](http://effectivejs.com/).

And in 2015 has been released specification ES2015, which contained a final version of [the module specification](http://www.ecma-international.org/ecma-262/6.0/#sec-modules). Let's adapt our example according of the tradition:

```JavaScript
// file hello.js
import { greeting } from "./lib/greeting";

const phrase = greeting.sayHello("ru");
document.write(phrase);

// file lib/greeting.js
const helloInLang = {
    en: "Hello world!",
    es: "¡Hola mundo!",
    ru: "Привет мир!"
};

export const greeting = {
    sayHello: function (lang) {
        return helloInLang[lang];
    }
};
```

As we can see, the standard introduces [the brand new keywords](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) to import modules using the keyword `import` and export code using `export`.

Since now we are dealing with new keywords in the language, we can't just pick up and start using a new system of modularity. You must wait for proper support in browsers, but at the moment (september 2016) there is no JavaScript engine with a stable implementation of the specification modules.

To begin using the new standard in a world ruled by ES5, you can use transpilation with [Babel](http://babeljs.io/) that is now fairly common practice.


# Instead of a conclusion

As the author of require.js [said](http://jrburke.com/2016/03/17/requirejs-2.2-alameda-1.0-released/) "The goal for them [AMD loaders] was to be useful, help inform the future". Now we can safely say that CommonJS and AMD has contributed to a modern modular system one way or another. Work for the support of new modularity systems in browsers and Node.JS [already underway](https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md) and, ultimately ES2015 Modules will be the main modular system of JavaScript.



All code in subdirictories is fully functional.
Also there are readme files in each directory. Check them out!



All code under the MIT License (MIT) 2016<br />
Text of the article under CC-BY-NC

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Лицензия Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />

P.S. If you found some sort of issue in the article (typos or grammar issues) please send pull request.
