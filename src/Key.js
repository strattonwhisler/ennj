ennj.module('ennj.Key', [], function() {
    'use strict';

    var Key = {
        // Editing
        BACKSPACE:          'Backspace',
        TAB:                'Tab',
        SPACE:              'Space',
        ENTER:              'Enter',

        // Control
        SHIFT_LEFT:         'ShiftLeft',
        SHIFT_RIGHT:        'ShiftRight',
        CTRL_LEFT:          'ControlLeft',
        CTRL_RIGHT:         'ControlRight',
        ALT_LEFT:           'AltLeft',
        ALT_RIGHT:          'AltRight',

        // Editing
        PAUSE:              'Pause',
        CAPS_LOCK:          'CapsLock',
        ESCAPE:             'Escape',
        PAGE_UP:            'PageUp',
        PAGE_DOWN:          'PageDown',
        END:                'End',
        HOME:               'Home',

        // Arrow
        LEFT_ARROW:         'ArrowLeft',
        UP_ARROW:           'ArrowUp',
        RIGHT_ARROW:        'ArrowRight',
        DOWN_ARROW:         'ArrowDown',

        // Editing
        INSERT:             'Insert',
        DELETE:             'Delete',

        // Numbers
        _0:                 'Digit0',
        _1:                 'Digit1',
        _2:                 'Digit2',
        _3:                 'Digit3',
        _4:                 'Digit4',
        _5:                 'Digit5',
        _6:                 'Digit6',
        _7:                 'Digit7',
        _8:                 'Digit8',
        _9:                 'Digit9',

        // Alphabet
        A:                  'KeyA',
        B:                  'KeyB',
        C:                  'KeyC',
        D:                  'KeyD',
        E:                  'KeyE',
        F:                  'KeyF',
        G:                  'KeyG',
        H:                  'KeyH',
        I:                  'KeyI',
        J:                  'KeyJ',
        K:                  'KeyK',
        L:                  'KeyL',
        M:                  'KeyM',
        N:                  'KeyN',
        O:                  'KeyO',
        P:                  'KeyP',
        Q:                  'KeyQ',
        R:                  'KeyR',
        S:                  'KeyS',
        T:                  'KeyT',
        U:                  'KeyU',
        V:                  'KeyV',
        W:                  'KeyW',
        X:                  'KeyX',
        Y:                  'KeyY',
        Z:                  'KeyZ',

        // Control
        LEFT_WINDOW_KEY:    '',
        RIGHT_WINDOW_KEY:   '',
        SELECT_KEY:         'Select',

        // Numpad
        NUMPAD_0:           'Numpad0',
        NUMPAD_1:           'Numpad1',
        NUMPAD_2:           'Numpad2',
        NUMPAD_3:           'Numpad3',
        NUMPAD_4:           'Numpad4',
        NUMPAD_5:           'Numpad5',
        NUMPAD_6:           'Numpad6',
        NUMPAD_7:           'Numpad7',
        NUMPAD_8:           'Numpad8',
        NUMPAD_9:           'Numpad9',

        MULTIPLY:           'NumpadMultiply',
        ADD:                'NumpadAdd',
        SUBTRACT:           'NumpadSubtract',
        DECIMAL:            'NumpadDecimal',
        DIVIDE:             'NumpadDivide',

        // Function
        F1:                 'F1',
        F2:                 'F2',
        F3:                 'F3',
        F4:                 'F4',
        F5:                 'F5',
        F6:                 'F6',
        F7:                 'F7',
        F8:                 'F8',
        F9:                 'F9',
        F10:                'F10',
        F11:                'F11',
        F12:                'F12',

        // Misc
        NUM_LOCK:           'NumLock',
        SCROLL_LOCK:        'ScrollLock',
        SEMI_COLON:         'Semicolon',
        EQUAL:              'Equal',
        COMMA:              'Comma',
        DASH:               'Minus',
        PERIOD:             'Period',
        FORWARD_SLASH:      'Slash',
        GRAVE:              'Backquote',
        OPEN_BRACKET:       'BracketLeft',
        BACK_SLASH:         'Backslash',
        CLOSE_BRACKET:       'BracketRight',
        SINGLE_QUOTE:       'Quote',
        PRINT:              'PrintScreen'
    };

    var rKey = {};
    for(var i in Key) {
        rKey[i] = ['key', Key[i]];
    }

    return rKey;
}, true);
