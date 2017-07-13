ennj.module('ennj.Class', [], function() {
    'use strict';

    function Class() {}

    Class.prototype.constructor = Class;

    Class.extend = extend;
    Class.once = once;

    function extend(child, proto) {
        child.prototype = Object.create(this.prototype);
        child.prototype.constructor = child;
        child.prototype.$super = this.prototype;
        child.extend = extend;
        child.once = once;
        for(var key in proto) {
            child.prototype[key] = proto[key];
        }
    }

    function once(proto) {
        for(var key in proto) {
            this[key] = proto[key];
        }
    }

    return Class;
}, true);
