ennj.module('ennj.Joy', [], function() {
    'use strict';

    var Button = {
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        LEFT_BUMPER: 4,
        RIGHT_BUMPER: 5,
        LEFT_TRIGGER: 6,
        RIGHT_TRIGGER: 7,
        BACK: 8,
        START: 9,
        LEFT_STICK: 10,
        RIGHT_STICK: 11,
        D_UP: 12,
        D_DOWN: 13,
        D_LEFT: 14,
        D_RIGHT: 15
    };

    var Axis = {
        LEFT_X: 0,
        LEFT_Y: 1,
        RIGHT_X: 2,
        RIGHT_Y: 3
    };

    var rButton = {};
    for(var i in Button) {
        rButton[i] = ['joybutton', Button[i]];
    }

    var rAxis = {};
    for(var i in Axis) {
        rAxis[i] = ['joyaxis', Axis[i]];
    }

    return {
        button: rButton,
        axis: rAxis
    };;
}, true);
