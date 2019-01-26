ennj.module('ennj.Mouse', [], function() {
    'use strict';

    var Mouse = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT : 2
    };

    var rMouse = {};
    for(var i in Mouse) {
        rMouse[i] = ['mouse', Mouse[i]];
    }

    return rMouse;
}, true);
