import Game from './Game';
import System from './System';
import Logger from '../util/Logger';
import Perf from 'ennj/debug/Perf';

const logger = new Logger('Ennj');

interface Options {
    canvas: string;
    width: number;
    height: number;
}

class Ennj<G extends Game> {
    private static instance: Ennj<any>;

    private options: Options;

    private game: Game;
    private gameCtor: new () => G;

    private system: System;

    private perf: Perf;

    private gl: WebGLRenderingContext;

    private canvas: HTMLCanvasElement;

    constructor(game: new () => G, options: Options) {
        this.gameCtor = game;
        this.options = options;

        this.init();
    }

    private init(): void {
        this.perf = new Perf();

        this.system = new System();
        logger.notice(`Version: ${this.system.version}`);
        logger.notice(`Agent: ${this.system.agent}`);
        logger.notice(`Language: ${this.system.language}`);
        logger.notice(`Touch: ${this.system.touchSupport}`);

        this.canvas = document.getElementById(this.options.canvas) as HTMLCanvasElement;
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;

        this.gl = this.canvas.getContext('webgl2') as WebGLRenderingContext;

        logger.debug(`Using game '${this.gameCtor.name}'`);
        this.game = new this.gameCtor();
        this.game.onLoad()
            .then(() => {
                this.game.onInit();
            })
            .catch((error) => {
                logger.critical('Failed to start game');
                logger.critical(error);
            });
    }

    public static start<G extends Game>(game: new () => G, options: Options) {
        const ennj = new Ennj<G>(game, options);
        Ennj.instance = ennj;
        return ennj;
    }

    public static get options() {
        return Ennj.instance.options;
    }

    public static get game() {
        return Ennj.instance.game;
    }

    public static get system() {
        return Ennj.instance.system;
    }

    public static get perf() {
        return Ennj.instance.perf;
    }

    public static get gl() {
        return Ennj.instance.gl;
    }
}

export default Ennj;
