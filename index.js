(function(){
    'use strict';

    var app = window.app = {},
        modules = {},
        definitions = {};

    app.require = function(name){
        if (modules.hasOwnProperty(name)) {
            return modules[name];
        }

        if (!definitions.hasOwnProperty(name)) {
            throw new Error('Module is not registered: "' + name + '"');
        }

        var args = [],
            definition = definitions[name];

        definition.deps.forEach(function(dep){
            args.push(app.require(dep));
        });

        modules[name] = definition.factory.apply(null, args);

        return modules[name];
    }

    app.define = function(name, deps, factory){
        if (definitions.hasOwnProperty(name)) {
            throw new Error('Module already registered: "' + name + '"');
        }

        if (!/^[a-zA-Z0-9\/_]+$/.test(name)) {
            throw new Error('Invalid module name: "' + name + '"');
        }

        if (!(deps instanceof Array)) {
            throw new Error('Module dependencies is not an array: "' + name + '"');
        }

        if (typeof factory !== 'function') {
            throw new Error('Module factory is not a function: "' + name + '"');
        }

        definitions[name] = {
            deps: deps,
            factory: factory,
        }

        return this;
    }
})();
