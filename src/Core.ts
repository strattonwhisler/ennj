import logger from './Logger';
import { Game } from './Game';
import { Loader } from './Loader';
import { Input } from './Input';

export class Engine<G extends Game> {
    private game: G;

    private frameId: number;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private startTime: number = 0;
    private delta: number = 0;

    public input: Input;

    public config: any;

    constructor(canvasId: string, game: G, config: any) {
        this.game = game;
        this.config = config;

        this.init(canvasId);
    }

    private init(canvasId: string): void {
        logger.trace('Initializing canvas');
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;

        this.ctx.imageSmoothingEnabled = false;

        this.input = new Input();
    }

    private loop(loopTime: number): void {
        {
            this.input.poll();
            this.game.update(this.delta);

            this.ctx.clearRect(0, 0, this.config.width, this.config.height);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, this.config.width, this.config.height);

            this.game.draw(this.ctx);
            this.game.drawUi(this.ctx);
        }

        this.delta = (loopTime - this.startTime) / 1000;
        this.startTime = loopTime;

        this.requestFrame();
    }

    private requestFrame(): void {
        this.frameId = requestAnimationFrame(this.loop.bind(this));
    }

    private cancelFrame(): void {
        cancelAnimationFrame(this.frameId);
    }

    public start(): void {
        logger.info('Starting engine');
        this.game.init();
        this.requestFrame();
    }

    public stop(): void {
        this.cancelFrame();
        this.game.destroy();
        logger.info('Stopping engine');
    }
}

export function main<G extends Game>(canvasId: string, game: G, loader: Loader, options: any): void {
    logger.notice('Version ', 'ennj 1.2.0a');
    logger.notice('Agent   ', navigator.userAgent);
    logger.notice('Language', navigator.language);
    logger.notice('Cookies ', navigator.cookieEnabled);

    const engine = new Engine<G>(canvasId, game, options);
    game.engine = engine;

    loader.load()
        .then(() => {
            engine.start();
        })
        .catch((err) => {
            logger.critical(err);
        });
}
