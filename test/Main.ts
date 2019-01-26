// import './Dev';

import Ennj from 'ennj/core/Ennj';
import Game from 'ennj/core/Game';
import Loader from 'ennj/asset/Loader';
import Sprite from 'ennj/asset/Sprite';
import Logger from 'ennj/util/Logger';
import SpriteRenderer from 'ennj/render/SpriteRenderer';
import Entity from 'ennj/scene/Entity';

const logger = new Logger('Game');

class Player extends Entity {
    private sprite: Sprite;
    private renderer: SpriteRenderer;

    constructor() {
        super();

        this.sprite = new Sprite('ennj://res/cc/move.png');
        this.renderer = new SpriteRenderer(Ennj.gl);
        this.renderer.sprite = this.sprite;

        this.setRenderer(this.renderer);
    }
}

class CoreLoader extends Loader {
    constructor() {
        super();

        this.addSprite('ennj://res/terrain.png');
        this.addSprite('ennj://res/cc/autumn-outside.png');
        this.addSprite('ennj://res/cc/move.png');
    }
}

class MyGame extends Game {
    constructor() {
        super();
    }

    public onLoad(): Promise<void> {
        return new CoreLoader().load();
    }

    public onInit(): void {
        const player = new Player();
        this.scene.attachEntity(player);
    }
}

window.onload = () => {
    logger.trace('Window loaded');

    const options = {
        canvas: 'canvas',
        width: 896,
        height: 504
    };

    Ennj.start(MyGame, options);
};
