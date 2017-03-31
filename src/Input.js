ennj.module('ennj.Input', [], function () {
    'use strict';

    var Key = {
        // Editing
        BACKSPACE:          8,
        TAB:                9,
        ENTER:              13,

        // Control
        SHIFT:              16,
        CTRL:               17,
        ALT:                18,

        // Editing
        PAUSE:              19,
        CAPS_LOCK:          20,
        ESCAPE:             27,
        PAGE_UP:            33,
        PAGE_DOWN:          34,
        END:                35,
        HOME:               36,

        // Arrow
        LEFT_ARROW:         37,
        UP_ARROW:           38,
        RIGHT_ARROW:        39,
        DOWN_ARROW:         40,

        // Editing
        INSERT:             45,
        DELETE:             46,

        // Numbers
        _0:                  48,
        _1:                  49,
        _2:                  50,
        _3:                  51,
        _4:                  52,
        _5:                  53,
        _6:                  54,
        _7:                  55,
        _8:                  56,
        _9:                  57,

        // Alphabet
        A:                  65,
        B:                  66,
        C:                  67,
        D:                  68,
        E:                  69,
        F:                  70,
        G:                  71,
        H:                  72,
        I:                  73,
        J:                  74,
        K:                  75,
        L:                  76,
        M:                  77,
        N:                  78,
        O:                  79,
        P:                  80,
        Q:                  81,
        R:                  82,
        S:                  83,
        T:                  84,
        U:                  85,
        V:                  86,
        W:                  87,
        X:                  88,
        Y:                  89,
        Z:                  90,

        // Control
        LEFT_WINDOW_KEY:    91,
        RIGHT_WINDOW_KEY:   92,
        SELECT_KEY:         93,

        // Numpad
        NUMPAD_0:           96,
        NUMPAD_1:           97,
        NUMPAD_2:           98,
        NUMPAD_3:           99,
        NUMPAD_4:           100,
        NUMPAD_5:           101,
        NUMPAD_6:           102,
        NUMPAD_7:           103,
        NUMPAD_8:           104,
        NUMPAD_9:           105,

        MULTIPLY:           106,
        ADD:                107,
        SUBTRACT:           109,
        DECIMAL:            110,
        DIVIDE:             111,

        // Function
        F1:                 112,
        F2:                 113,
        F3:                 114,
        F4:                 115,
        F5:                 116,
        F6:                 117,
        F7:                 118,
        F8:                 119,
        F9:                 120,
        F10:                121,
        F11:                122,
        F12:                123,

        // Misc
        NUM_LOCK:           144,
        SCROLL_LOCK:        145,
        SEMI_COLON:         186,
        EQUAL:              187,
        COMMA:              88,
        DASH:               189,
        PERIOD:             190,
        FORWARD_SLASH:      191,
        GRAVE:              192,
        OPEN_BRACKET:       219,
        BACK_SLASH:         220,
        CLOSE_BRAKET:       221,
        SINGLE_QUOTE:       222
    };

    var Mouse = {

    };

    function Input() {
        this.Key = Key;
        this.Mouse = Mouse;
        this._pressed = {},
        this._bound = {};
    }

    Input.prototype.constructor = Input;
    Input.prototype.bind = bind;
    Input.prototype.unbind = unbind;

    function bind(key, name) {
        if(!bound[key]) {
            bound[key] = name;
        } else {
            throw 'Key already bound: ' + key + ' ' + name;
        }
    }

    function unbind(key) {
        if(bound[key]) {
            delete bound[key];
        } else {
            throw 'Key already bound: ' + key + ' ' + name;
        }
    }

    return new Input();
}, true);
