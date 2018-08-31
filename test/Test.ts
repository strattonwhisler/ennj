import {
    Game,
    Image,
    Loader,
    Input,
    Key,
    Joy,
    logger
} from '../src/index';

export class Test extends Game {
    private image: Image;

    private speed: number = 120;
    private size: number = 512;

    private bgcolor: string = '#FFFFFF';
    private linecolor: string = '#000000';

    private x: number = 0;
    private y: number = 0;
    private right: boolean = true;
    private up: boolean = false;

    public init() {
        logger.info('init');

        this.image = Image.create('res/terrain.png');

        // Keyboard
        this.engine.input.bind('horizontal', Key.A, -1);
        this.engine.input.bind('horizontal', Key.D, 1);
        this.engine.input.bind('vertical', Key.W, 1);
        this.engine.input.bind('vertical', Key.S, -1);

        // Controller
        this.engine.input.bind('horizontal', Joy.LEFT_STICK_X, 1);
        this.engine.input.bind('vertical', Joy.LEFT_STICK_Y, -1);
    }

    private lastA: boolean = false;

    public update(delta: number) {
        this.x += this.engine.input.getAxis('horizontal') * this.size * delta;
        this.y += -this.engine.input.getAxis('vertical') * this.size * delta;
    }

    public draw(gl: WebGLRenderingContext) {
        // this.image.draw(ctx, this.x - (this.size / 2), this.y - (this.size / 2), size, size);
    }

    public drawUi(gl: WebGLRenderingContext) {
    }

    public destroy() {
        logger.info('destroy');
    }
}
