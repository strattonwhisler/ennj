import logger from 'ennj/util/Logger';

export enum Key {
    // Editing
    BACKSPACE =          'key Backspace',
    TAB =                'key Tab',
    SPACE =              'key Space',
    ENTER =              'key Enter',

    // Control
    SHIFT_LEFT =         'key ShiftLeft',
    SHIFT_RIGHT =        'key ShiftRight',
    CTRL_LEFT =          'key ControlLeft',
    CTRL_RIGHT =         'key ControlRight',
    ALT_LEFT =           'key AltLeft',
    ALT_RIGHT =          'key AltRight',

    // Editing
    PAUSE =              'key Pause',
    CAPS_LOCK =          'key CapsLock',
    ESCAPE =             'key Escape',
    PAGE_UP =            'key PageUp',
    PAGE_DOWN =          'key PageDown',
    END =                'key End',
    HOME =               'key Home',

    // Arrow
    LEFT_ARROW =         'key ArrowLeft',
    UP_ARROW =           'key ArrowUp',
    RIGHT_ARROW =        'key ArrowRight',
    DOWN_ARROW =         'key ArrowDown',

    // Editing
    INSERT =             'key Insert',
    DELETE =             'key Delete',

    // Numbers
    _0 =                 'key Digit0',
    _1 =                 'key Digit1',
    _2 =                 'key Digit2',
    _3 =                 'key Digit3',
    _4 =                 'key Digit4',
    _5 =                 'key Digit5',
    _6 =                 'key Digit6',
    _7 =                 'key Digit7',
    _8 =                 'key Digit8',
    _9 =                 'key Digit9',

    // Alphabet
    A =                  'key KeyA',
    B =                  'key KeyB',
    C =                  'key KeyC',
    D =                  'key KeyD',
    E =                  'key KeyE',
    F =                  'key KeyF',
    G =                  'key KeyG',
    H =                  'key KeyH',
    I =                  'key KeyI',
    J =                  'key KeyJ',
    K =                  'key KeyK',
    L =                  'key KeyL',
    M =                  'key KeyM',
    N =                  'key KeyN',
    O =                  'key KeyO',
    P =                  'key KeyP',
    Q =                  'key KeyQ',
    R =                  'key KeyR',
    S =                  'key KeyS',
    T =                  'key KeyT',
    U =                  'key KeyU',
    V =                  'key KeyV',
    W =                  'key KeyW',
    X =                  'key KeyX',
    Y =                  'key KeyY',
    Z =                  'key KeyZ',

    // Control
    LEFT_WINDOW_KEY =    'key ',
    RIGHT_WINDOW_KEY =   'key ',
    SELECT_KEY =         'key Select',

    // Numpad
    NUMPAD_0 =           'key Numpad0',
    NUMPAD_1 =           'key Numpad1',
    NUMPAD_2 =           'key Numpad2',
    NUMPAD_3 =           'key Numpad3',
    NUMPAD_4 =           'key Numpad4',
    NUMPAD_5 =           'key Numpad5',
    NUMPAD_6 =           'key Numpad6',
    NUMPAD_7 =           'key Numpad7',
    NUMPAD_8 =           'key Numpad8',
    NUMPAD_9 =           'key Numpad9',

    MULTIPLY =           'key NumpadMultiply',
    ADD =                'key NumpadAdd',
    SUBTRACT =           'key NumpadSubtract',
    DECIMAL =            'key NumpadDecimal',
    DIVIDE =             'key NumpadDivide',

    // Function
    F1 =                 'key F1',
    F2 =                 'key F2',
    F3 =                 'key F3',
    F4 =                 'key F4',
    F5 =                 'key F5',
    F6 =                 'key F6',
    F7 =                 'key F7',
    F8 =                 'key F8',
    F9 =                 'key F9',
    F10 =                'key F10',
    F11 =                'key F11',
    F12 =                'key F12',

    // Misc
    NUM_LOCK =           'key NumLock',
    SCROLL_LOCK =        'key ScrollLock',
    SEMI_COLON =         'key Semicolon',
    EQUAL =              'key Equal',
    COMMA =              'key Comma',
    DASH =               'key Minus',
    PERIOD =             'key Period',
    FORWARD_SLASH =      'key Slash',
    GRAVE =              'key Backquote',
    OPEN_BRACKET =       'key BracketLeft',
    BACK_SLASH =         'key Backslash',
    CLOSE_BRACKET =      'key BracketRight',
    SINGLE_QUOTE =       'key Quote',
    PRINT =              'key PrintScreen'
}

export enum Mouse {
    LEFT =               'mouse 0',
    MIDDLE =             'mouse 1',
    RIGHT =              'mouse 2'
}

export enum Joy {
    LEFT_STICK_X =        'joyaxis 0',
    LEFT_STICK_Y =        'joyaxis 1',
    RIGHT_STICK_X =       'joyaxis 2',
    RIGHT_STICK_Y =       'joyaxis 3',

    A =                   'joybutton 0',
    B =                   'joybutton 1',
    X =                   'joybutton 2',
    Y =                   'joybutton 3',
    LEFT_BUMPER =         'joybutton 4',
    RIGHT_BUMPER =        'joybutton 5',
    LEFT_TRIGGER =        'joybutton 6',
    RIGHT_TRIGGER =       'joybutton 7',
    SELECT =              'joybutton 8',
    START =               'joybutton 9',
    LEFT_STICK =          'joybutton 10',
    RIGHT_STICK =         'joybutton 11',
    UP =                  'joybutton 12',
    DOWN =                'joybutton 13',
    LEFT =                'joybutton 14',
    RIGHT =               'joybutton 15',
    HOME =                'joybutton 16'
}

type InputDevice = Key | Mouse | Joy;

export class Input {
    private keyState: Array<string> = [];
    private mouseState: Array<number> = [];
    private joyaxisState: {[id: string]: number} = {};
    private joybuttonState: {[id: string]: number} = {};

    private bound: {[name: string]: {[action: string]: number}} = {};

    private deadzone: number = 0.2;

    constructor() {
        document.addEventListener('keydown', event => {
            event.preventDefault();
            this.keydown(event);
        }, false);

        document.addEventListener('keyup', event => {
            event.preventDefault();
            this.keyup(event);
        }, false);

        document.addEventListener('mousedown', event => {
            event.preventDefault();
            this.mousedown(event);
        }, false);

        document.addEventListener('mouseup', event => {
            event.preventDefault();
            this.mouseup(event);
        }, false);

        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        }, false);
    }

    public poll(): void {
        const gamepad = navigator.getGamepads()[0];
        if(gamepad) {
            for(let i = 0;i < gamepad.axes.length;i++) {
                const value = gamepad.axes[i];
                if(Math.abs(value) >= this.deadzone) {
                    this.joyaxisState[i] = value;
                } else {
                    delete this.joyaxisState[i];
                }

            }
            for(let i = 0;i < gamepad.buttons.length;i++) {
                const {pressed, value} = gamepad.buttons[i];
                if(pressed) {
                    this.joybuttonState[i] = value;
                } else {
                    delete this.joybuttonState[i];
                }
            }
        }
    }

    private keydown(event: KeyboardEvent): void {
        if(this.keyState.indexOf(event.code) === -1) {
            this.keyState.push(event.code);
        }
    }

    private keyup(event: KeyboardEvent): void {
        const index = this.keyState.indexOf(event.code);
        if(index !== -1) {
            this.keyState.splice(index, 1);
        }
    }

    private mousedown(event: MouseEvent): void {
        if(this.mouseState.indexOf(event.which) === -1) {
            this.mouseState.push(event.which);
        }
    }

    private mouseup(event: MouseEvent): void {
        const index = this.mouseState.indexOf(event.which);
        if(index !== -1) {
            this.mouseState.splice(index, 1);
        }
    }

    public getDown(name: string): boolean {
        let state = false;
        for(const action in this.bound[name]) {
            const [type, id] = action.split(' ');
            switch(type) {
                case 'key': state = state || this.keyState.indexOf(id) !== -1; break;
                case 'mouse': state = state || this.mouseState.indexOf(+id) !== -1; break;
                case 'joyaxis': state = state || (this.bound[name][action] * this.joyaxisState[id] >= this.deadzone); break;
                case 'joybutton': state = state || (this.joyaxisState[id] > 0); break;
            }
        }
        return state;
    }

    public getAxis(name: string): number {
        let state = 0;
        for(const action in this.bound[name]) {
            const [type, id] = action.split(' ');
            switch(type) {
                case 'key': state = (this.keyState.indexOf(id) !== -1) ? this.bound[name][action] : state; break;
                case 'mouse': state = (this.mouseState.indexOf(+id) !== -1) ? this.bound[name][action] : state; break;
                case 'joyaxis': state = (this.joyaxisState[id]) ? this.bound[name][action] * this.joyaxisState[id] : state; break;
                case 'joybutton': state = (this.joybuttonState[id]) ? this.bound[name][action] * this.joybuttonState[id] : state; break;
            }
        }
        return state;
    }

    public bind(name: string, action: InputDevice, axis: number = 1) {
        logger.trace(`Binding action "${action}" on name "${name}"`);
        if(this.bound[name]) {
            this.bound[name][action] = axis;
        } else {
            this.bound[name] = {
                [action]: axis
            };
        }
    }

    public unbind(name: string, action: InputDevice) {
        logger.trace(`Unbinding action "${action}" on name "${name}"`);
        if(this.bound[name]) {
            delete this.bound[name][action];
        } else {
            logger.warning(`Attempted to unbind action "${action}" on unknown name "${name}"`);
        }
    }
}
