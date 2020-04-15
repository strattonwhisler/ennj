import { EngineConfig } from './engine-config';
import { Engine } from './engine';


export abstract class Game {
    public engine!: Engine;

    abstract onBootstrap(): void;

    abstract get config(): EngineConfig;

    abstract onInit(): void;

    abstract onStart(): void;

    abstract onUpdate(delta: number): void;

    abstract onStop(): void;

    abstract onDestroy(): void;
}
