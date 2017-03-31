var ennj = (function (ns) {
    'use strict';

    ns.module = module;
    ns.require = require;

    ns.modules = {};

    function module(name, requires, loader, appendNS) {
        if(!ns.modules[name]) {
            ns.modules[name] = {
                name: name,
                loader: loader,
                instance: null,
                requires: requires,
                ns: appendNS || false
            };
        } else {
            throw 'Module already exists: "' + name + '"';
        }
    }

    function require(name) {
        if(ns.modules[name]) {
            if(!ns.modules[name].instance) {
                instantiateModule(name);
            }
            return ns.modules[name].instance;
        } else {
            throw 'Module not found: "' + name + '"';
        }
    }

    function instantiateModule(name) {
        var module = ns.modules[name];

        if(module === undefined) {
            throw 'Unknown module: "' + name + '"';
        }

        if(module.instance) {
            return;
        }

        var requires = [];

        for(var i = 0;i < module.requires.length;i++) {
            instantiateModule(module.requires[i]);
            requires.push(ns.modules[
                module.requires[i]
            ].instance);
        }

        module.instance = module.loader.apply(null, requires);

        if(module.ns) {
            var parts = module.name.split('.');
            var parent = window;

            for(var i = 0;i < parts.length;i++) {
                var part = parts[i];

                if(i === parts.length - 1) {
                    parent[parts[i]] = ns.modules[name].instance;
                    break;
                }

                if(parent[part] === undefined) {
                    parent[part] = {};
                }

                parent = parent[part];
            }
        }
    }

    return ns;
}(ennj || {}));
