var ennj = (function (ns) {
    'use strict';

    ns.module = module;
    ns.require = require;

    ns._modules = {};

    function module(name, requires, initializer, appendNS) {
        if(!ns._modules[name]) {
            ns._modules[name] = {
                name: name,
                initializer: initializer,
                instance: null,
                requires: requires,
                ns: appendNS || false
            };
            logger.info('Loaded module: "' + name + '"');
        } else {
            logger.error('Module already exists: "' + name + '"');
            throw 'Module already exists: "' + name + '"';
        }
    }

    function require(name) {
        if(ns._modules[name]) {
            if(!ns._modules[name].instance) {
                instantiateModule(name);
            }
            return ns._modules[name].instance;
        } else {
            logger.error('Module not found: "' + name + '"');
            throw 'Module not found: "' + name + '"';
        }
    }

    function instantiateModule(name) {
        var module = ns._modules[name];

        if(module === undefined) {
            logger.error('Unknown module: "' + name + '"');
            throw 'Unknown module: "' + name + '"';
        }

        if(module.instance) {
            return;
        }

        var requires = [];

        for(var i = 0;i < module.requires.length;i++) {
            instantiateModule(module.requires[i]);
            requires.push(ns._modules[
                module.requires[i]
            ].instance);
        }

        module.instance = module.initializer.apply(ns, requires);

        if(module.ns) {
            var parts = module.name.split('.');
            var parent = window;

            for(var i = 0;i < parts.length;i++) {
                var part = parts[i];

                if(i === parts.length - 1) {
                    parent[parts[i]] = ns._modules[name].instance;
                    break;
                }

                if(parent[part] === undefined) {
                    parent[part] = {};
                }

                parent = parent[part];
            }
        }

        logger.info('Initantiated module: "' + name + '"');
    }

    return ns;
}(ennj || {}));
