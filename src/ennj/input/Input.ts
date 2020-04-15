import { Logger } from '../core/logger';
import { Key } from './key';
import { Mouse } from './mouse';
import { Joy } from './joy';


const logger = new Logger('input');

type InputDevice = Key | Mouse | Joy;

export class Input {
    private keyState: Array<string> = [];
    private mouseState: Array<number> = [];
    private joyaxisState: {[id: string]: number} = {};
    private joybuttonState: {[id: string]: number} = {};

    private bound: {[name: string]: {[action: string]: number}} = {};

    private deadzone: number = 0.2;

    public constructor() {
        document.addEventListener('keydown', this.keydown.bind(this), false);
        document.addEventListener('keyup', this.keyup.bind(this), false);
        document.addEventListener('mousedown', this.mousedown.bind(this), false);
        document.addEventListener('mouseup', this.mouseup.bind(this), false);
        document.addEventListener('contextmenu', this.contextmenu.bind(this), false);
    }

    public destructor(): void {
        document.removeEventListener('keydown', this.keydown);
        document.removeEventListener('keyup', this.keyup);
        document.removeEventListener('mousedown', this.mousedown);
        document.removeEventListener('mouseup', this.mouseup);
        document.removeEventListener('contextmenu', this.contextmenu);
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
        event.preventDefault();
        if(this.keyState.indexOf(event.code) === -1) {
            this.keyState.push(event.code);
        }
    }

    private keyup(event: KeyboardEvent): void {
        event.preventDefault();
        const index = this.keyState.indexOf(event.code);
        if(index !== -1) {
            this.keyState.splice(index, 1);
        }
    }

    private mousedown(event: MouseEvent): void {
        event.preventDefault();
        if(this.mouseState.indexOf(event.which) === -1) {
            this.mouseState.push(event.which);
        }
    }

    private mouseup(event: MouseEvent): void {
        event.preventDefault();
        const index = this.mouseState.indexOf(event.which);
        if(index !== -1) {
            this.mouseState.splice(index, 1);
        }
    }

    private contextmenu(event: MouseEvent): void {
        event.preventDefault();
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
