ennj.module('ennj.Key', [], function() {
    'use strict';

    // var Key = {
    //     // Editing
    //     BACKSPACE:          8,
    //     TAB:                9,
    //     ENTER:              13,
    //
    //     // Control
    //     SHIFT:              16,
    //     CTRL:               17,
    //     ALT:                18,
    //
    //     // Editing
    //     PAUSE:              19,
    //     CAPS_LOCK:          20,
    //     ESCAPE:             27,
    //     PAGE_UP:            33,
    //     PAGE_DOWN:          34,
    //     END:                35,
    //     HOME:               36,
    //
    //     // Arrow
    //     LEFT_ARROW:         37,
    //     UP_ARROW:           38,
    //     RIGHT_ARROW:        39,
    //     DOWN_ARROW:         40,
    //
    //     // Editing
    //     INSERT:             45,
    //     DELETE:             46,
    //
    //     // Numbers
    //     _0:                  48,
    //     _1:                  49,
    //     _2:                  50,
    //     _3:                  51,
    //     _4:                  52,
    //     _5:                  53,
    //     _6:                  54,
    //     _7:                  55,
    //     _8:                  56,
    //     _9:                  57,
    //
    //     // Alphabet
    //     A:                  65,
    //     B:                  66,
    //     C:                  67,
    //     D:                  68,
    //     E:                  69,
    //     F:                  70,
    //     G:                  71,
    //     H:                  72,
    //     I:                  73,
    //     J:                  74,
    //     K:                  75,
    //     L:                  76,
    //     M:                  77,
    //     N:                  78,
    //     O:                  79,
    //     P:                  80,
    //     Q:                  81,
    //     R:                  82,
    //     S:                  83,
    //     T:                  84,
    //     U:                  85,
    //     V:                  86,
    //     W:                  87,
    //     X:                  88,
    //     Y:                  89,
    //     Z:                  90,
    //
    //     // Control
    //     LEFT_WINDOW_KEY:    91,
    //     RIGHT_WINDOW_KEY:   92,
    //     SELECT_KEY:         93,
    //
    //     // Numpad
    //     NUMPAD_0:           96,
    //     NUMPAD_1:           97,
    //     NUMPAD_2:           98,
    //     NUMPAD_3:           99,
    //     NUMPAD_4:           100,
    //     NUMPAD_5:           101,
    //     NUMPAD_6:           102,
    //     NUMPAD_7:           103,
    //     NUMPAD_8:           104,
    //     NUMPAD_9:           105,
    //
    //     MULTIPLY:           106,
    //     ADD:                107,
    //     SUBTRACT:           109,
    //     DECIMAL:            110,
    //     DIVIDE:             111,
    //
    //     // Function
    //     F1:                 112,
    //     F2:                 113,
    //     F3:                 114,
    //     F4:                 115,
    //     F5:                 116,
    //     F6:                 117,
    //     F7:                 118,
    //     F8:                 119,
    //     F9:                 120,
    //     F10:                121,
    //     F11:                122,
    //     F12:                123,
    //
    //     // Misc
    //     NUM_LOCK:           144,
    //     SCROLL_LOCK:        145,
    //     SEMI_COLON:         186,
    //     EQUAL:              187,
    //     COMMA:              88,
    //     DASH:               189,
    //     PERIOD:             190,
    //     FORWARD_SLASH:      191,
    //     GRAVE:              192,
    //     OPEN_BRACKET:       219,
    //     BACK_SLASH:         220,
    //     CLOSE_BRAKET:       221,
    //     SINGLE_QUOTE:       222
    // };

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
        CLOSE_BRAKET:       'BrackRight',
        SINGLE_QUOTE:       'Quote',
        PRINT:              'PrintScreen'
    };

    return Key;
}, true);
