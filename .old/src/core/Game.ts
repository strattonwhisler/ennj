import { Engine } from 'ennj/core/Engine';
import { Input } from 'ennj/core/Input';

export abstract class Game {
    public engine: Engine<this>;
    public input: Input;

    public abstract init(): void;
    public abstract update(delta: number): void;
    public abstract draw(gl: WebGLRenderingContext): void;
    public abstract drawUi(gl: WebGLRenderingContext): void;
    public abstract destroy(): void;
}
