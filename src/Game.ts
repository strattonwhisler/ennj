import { Engine } from './Core';

export abstract class Game {
    public engine: Engine<this>;

    public abstract init(): void;
    public abstract update(delta: number): void;
    public abstract draw(ctx: CanvasRenderingContext2D): void;
    public abstract drawUi(ctx: CanvasRenderingContext2D): void;
    public abstract destroy(): void;
}
