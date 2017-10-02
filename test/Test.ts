import {
    Game,
    Image,
    Loader,
    Input,
    Key,
    Joy,
    logger
} from '../src';

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
        this.engine.input.bind('swap', Key.E);
        this.engine.input.bind('zoom', Key.UP_ARROW, -1);
        this.engine.input.bind('zoom', Key.DOWN_ARROW, 1);

        // Controller
        this.engine.input.bind('horizontal', Joy.LEFT_STICK_X, 1);
        this.engine.input.bind('vertical', Joy.LEFT_STICK_Y, -1);
        this.engine.input.bind('swap', Joy.A, 1);
        this.engine.input.bind('zoom', Joy.RIGHT_STICK_Y, -1);
        this.engine.input.bind('zoom', Joy.RIGHT_BUMPER, 1);
        this.engine.input.bind('zoom', Joy.LEFT_BUMPER, -1);

    }

    private lastA: boolean = false;

    public update(delta: number) {
        if(this.engine.input.getAxis('zoom') < 0) {
            this.size -= (this.size / 2) * delta;
        }

        if(this.engine.input.getAxis('zoom') > 0) {
            this.size +=  (this.size / 2) * delta;
        }

        if(this.engine.input.getAxis('swap') > 0 && !this.lastA) {
            if(this.bgcolor === '#FFFFFF') {
                this.bgcolor = '#000000';
                this.linecolor = '#FFFFFF';
            } else {
                this.bgcolor = '#FFFFFF';
                this.linecolor = '#000000';
            }
            this.lastA = true;
        }
        if(this.engine.input.getAxis('swap') === 0) {
            this.lastA = false;
        }

        this.x += this.engine.input.getAxis('horizontal') * this.size * delta;
        this.y += -this.engine.input.getAxis('vertical') * this.size * delta;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        const size = this.size;
        const scale = size / 32;

        ctx.fillStyle = this.bgcolor;
        ctx.fillRect(0, 0, 800, 500);

        ctx.fillStyle = this.linecolor;
        const xOffset = this.x % scale;
        for(let x = 0;x <= Math.ceil(800 / scale);x++) {
            ctx.fillRect((scale * x) + xOffset, 0, 1, 500);
        }
        const yOffset = this.y % scale;
        for(let y = 0;y <= Math.ceil(500 / scale);y++) {
            ctx.fillRect(0, (scale * y) + yOffset, 800, 1);
        }

        this.image.draw(ctx, this.x - (this.size / 2), this.y - (this.size / 2), size, size);
    }

    public drawUi(ctx: CanvasRenderingContext2D) {

    }

    public destroy() {
        logger.info('destroy');
    }
}
