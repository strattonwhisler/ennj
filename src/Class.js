ennj.module('ennj.Class', [], function() {
    'use strict';

    function Class() {}

    Class.prototype.constructor = Class;

    Class.extend = extend;

    function extend(child, proto) {
        child.prototype = Object.create(this.prototype);
        child.prototype.constructor = child;
        child.prototype.$super = this.prototype;
        child.extend = extend;
        for(var key in proto) {
            child.prototype[key] = proto[key];
        }
    }

    return Class;
}, true);
