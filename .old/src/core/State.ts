export abstract class State {
    public abstract init(): void;
    public abstract update(delta: number): void;
}
