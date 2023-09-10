import { Publisher } from "./publisher";

interface InputDevice {
  poll (): void;
  // getAxis (): number;
}

export type MouseEventListener = (event: MouseEvent) => void;

class MouseDevice implements InputDevice, Disposable {
  protected buttons: Set<number> = new Set();

  protected readonly mousedownHandle: MouseEventListener;
  protected readonly mouseupHandle: MouseEventListener;
  protected readonly contextmenuHandle: MouseEventListener;
  protected readonly mousemoveHandle: MouseEventListener;

  constructor (
    protected readonly events: Publisher<InputEvent>
  ) {
    this.mousedownHandle = this.mousedown.bind(this);
    this.mouseupHandle = this.mouseup.bind(this);
    this.contextmenuHandle = this.contextmenu.bind(this);
    this.mousemoveHandle = this.mousemove.bind(this);
    document.addEventListener('mousedown', this.mousedownHandle, false);
    document.addEventListener('mouseup', this.mouseupHandle, false);
    document.addEventListener('contextmenu', this.contextmenuHandle, false);
    document.addEventListener('mousemove', this.mousemoveHandle, false);
  }

  [Symbol.dispose] (): void {
    window.removeEventListener(
      'mousedown',
      this.mousedownHandle
    );
    window.removeEventListener(
      'mouseup',
      this.mouseupHandle
    );
    window.removeEventListener(
      'contextmenu',
      this.contextmenuHandle
    );
  }

  poll (): void {}

  protected mousedown (event: MouseEvent): void {
    event.preventDefault();
    if (!this.buttons.has(event.button)) {
      this.buttons.add(event.button);
      this.events.publish({
        device: -1,
        input: `mouse_${event.button}`,
        value: 1,
        edge: Edge.Rising
      });
    }
  }

  protected mouseup (event: MouseEvent): void {
    event.preventDefault();
    if (this.buttons.has(event.button)) {
      this.buttons.delete(event.button);
      this.events.publish({
        device: -1,
        input: `mouse_${event.button}`,
        value: 1,
        edge: Edge.Falling
      });
    }
  }

  protected contextmenu (event: MouseEvent): void {
    event.preventDefault();
  }

  protected mousemove (event: MouseEvent): void {
    event.preventDefault();
    //TODO
  }
}

export type KeyboardEventListener = (event: KeyboardEvent) => void;

class KeyDevice implements InputDevice, Disposable {
  protected keys: Set<string> = new Set();

  protected readonly keydownHandle: KeyboardEventListener;
  protected readonly keyupHandle: KeyboardEventListener;

  constructor (
      protected readonly events: Publisher<InputEvent>
  ) {
    this.keydownHandle = this.keydown.bind(this);
    this.keyupHandle = this.keyup.bind(this);
    document.addEventListener('keydown', this.keydownHandle, false);
    document.addEventListener('keyup', this.keyupHandle, false);
  }

  [Symbol.dispose] (): void {
    document.removeEventListener('keydown', this.keydownHandle);
    document.removeEventListener('keyup', this.keyupHandle);
  }

  poll (): void {}

  protected keydown (event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.keys.has(event.code)) {
      this.keys.add(event.code);
      this.events.publish({
        device: -1,
        input: `key_${event.code}`,
        value: 1,
        edge: Edge.Rising
      });
    }
  }

  protected keyup (event: KeyboardEvent): void {
    event.preventDefault();
    if (this.keys.has(event.code)) {
      this.keys.delete(event.code);
      this.events.publish({
        device: -1,
        input: `key_${event.code}`,
        value: 1,
        edge: Edge.Falling
      });
    }
  }
}

class GamepadDevice implements InputDevice, Disposable {
  protected buttons: Map<number, number> = new Map();
  protected axes: Map<number, number> = new Map();

  constructor (
    protected readonly events: Publisher<InputEvent>,
    public readonly device: number
  ) {}

  [Symbol.dispose] () {
  }

  poll (): void {
    const gamepad = navigator.getGamepads()[this.device];
    if (gamepad) {
      let index: number = 0;
      for (const { pressed, value } of gamepad.buttons) {
        if (pressed) {
          const held = this.buttons.has(index);
          this.buttons.set(index, value);
          if (held) {
            this.events.publish({
              device: this.device,
              input: `gpb_${index}`,
              value,
              edge: Edge.Held
            });
          } else {
            this.events.publish({
              device: this.device,
              input: `gpb_${index}`,
              value,
              edge: Edge.Rising
            });
          }
        } else {
          this.buttons.delete(index);
          this.events.publish({
            device: this.device,
            input: `gpb_${index}`,
            value,
            edge: Edge.Falling
          });
        }
        index++;
      }
      index = 0;
      for (const value of gamepad.axes) {
        this.axes.set(index, value);
        this.events.publish({
          device: this.device,
          input: `gpa_${index}`,
          value,
          edge: Edge.Held
        });
        index++;
      }
    }
  }
}

export type GamepadEventListener = (event: GamepadEvent) => void;

export enum Action {
  Momentary,
  Axis,
  Toggle,
  Continuously,
}

export enum Edge {
  Rising,
  Falling,
  Held
}

export interface InputEvent {
  device: number;
  input: string;
  value: number;
  edge: Edge;
}

export class Input implements Disposable {
  protected devices: Array<InputDevice> = [];

  protected readonly events: Publisher<InputEvent>;

  protected readonly gamepadconnectedHandle: GamepadEventListener;
  protected readonly gamepaddisconnectedHandle: GamepadEventListener;

  constructor () {
    this.events = new Publisher<InputEvent>();

    this.devices.push(new MouseDevice(this.events));
    this.devices.push(new KeyDevice(this.events));

    this.gamepadconnectedHandle = this.gamepadconnected.bind(this);
    this.gamepaddisconnectedHandle = this.gamepaddisconnected.bind(this);
    window.addEventListener('gamepadconnected', this.gamepadconnectedHandle, false);
    window.addEventListener('gamepaddisconnected', this.gamepaddisconnectedHandle, false);
  }

  [Symbol.dispose] (): void {
    window.removeEventListener(
      'gamepadconnected',
      this.gamepadconnectedHandle
    );
    window.removeEventListener(
      'gamepaddisconnected',
      this.gamepaddisconnectedHandle
    );
  }

  poll (): void {
    for (const device of this.devices) {
      device.poll();
    }
  }

  register (): void {}

  protected gamepadconnected (event: GamepadEvent): void {
    this.devices.push(new GamepadDevice(this.events, event.gamepad.index));
  }

  protected gamepaddisconnected (event: GamepadEvent): void {
    this.devices.splice(
      this.devices.findIndex(device =>
        device instanceof GamepadDevice
          ? device.device === event.gamepad.index
          : false
      ),
      1
    );
  }
}
