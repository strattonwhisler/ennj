// import AssetManager from '../asset/AssetManager';
import Scene from '../scene/Scene';

abstract class Game {
    // public assets: AssetManager;

    public scene: Scene;

    constructor() {
        // this.assets = new AssetManager();

        this.scene = new Scene();
    }

    public abstract onLoad(): Promise<void>;

    public abstract onInit(): void;
}

export default Game;
