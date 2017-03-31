ennj.module('ennj.Vector', ['ennj.Class'], function(Class) {
    'use strict';

    function Vector(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    Class.extend(Vector, {
        add: add,
        sub: sub,
        mul: mul,
        div: div,
        dot: dot,
        normalize: normalize,
        length: length
    });

    function add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    function sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    function mul(k) {
        this.x *= k;
        this.y *= k;
        return this;
    }

    function div(k) {
        this.x /= k;
        this.y /= k;
        return this;
    }

    function dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }

    function normalize() {
        var l = this.length();
        this.x /= l;
        this.y /= l;
        return this;
    }

    function length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    return Vector;
}, true);
