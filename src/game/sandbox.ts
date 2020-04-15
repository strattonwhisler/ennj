import { BackgroundRenderer } from '../ennj/render/renderer/background-renderer';
import { injectable } from '../ennj/di/injectable';
import { Game } from '../ennj/core/game';
import { EngineConfig } from '../ennj/core/engine-config';
import { Logger } from '../ennj/core/logger';


const logger = new Logger('sandbox');

@injectable()
export class Sandbox extends Game {
    private r!: BackgroundRenderer;

    public constructor() {
        super();
    }

    public onBootstrap(): void {
        logger.debug('bootstrap');

        (window as any).sandbox = this;
    }

    public get config(): EngineConfig {
        return {
            canvas: {
                id: 'canvas',
                // width: 854,
                width: window.innerWidth,
                // height: 480
                height: window.innerHeight
            }
        };
    }

    public onInit(): void {
        logger.debug('init');

        this.engine.start();
    }

    public onStart(): void {
        logger.debug('start');

        // const image = new Image();
        // // image.src = 'res/ground.png';
        // image.src = 'res/emilie.png';
        // // image.src = 'res/emilie-attack.png';
        // // image.src = 'res/emilie-face.png';
        // // image.src = 'res/autumn-outside.png';
        // image.onload = () => {
        //     const size = image.width > image.height ? image.width : (image.height / image.width) * image.width;
        //
        //     this.r = new BackgroundRenderer((this.engine as any).gl, image, size);
        //
        //     (this.engine as any).renderPipeline.attach(this.r);
        // };
    }

    private time: number = 0;
    public onUpdate(delta: number): void {
        // logger.debug(delta);
        // this.time += delta;
        // const s = (Math.sin(this.time) + 1) / 2;
        // if(this.r) {
        //     this.r.modelMatrix.set(0, s);
        //     this.r.modelMatrix.set(5, s);
        //     this.r.modelMatrix.set(10, s);
        // }
    }

    public onStop(): void {
        logger.debug('stop');
    }

    public onDestroy(): void {
        logger.debug('destroy');
    }
}
