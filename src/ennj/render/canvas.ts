import { WebGl } from '../common';
import { Logger } from '../core/logger';
import { EngineConfig } from '../core/engine-config';
import { injectable } from '../di/injectable';
import { inject } from '../di/inject';
import * as Tokens from '../core/tokens';


const logger = new Logger('canvas');

@injectable()
export class Canvas {
    private readonly canvas: HTMLCanvasElement;

    public constructor(
        @inject(Tokens.EngineConfig) private config: EngineConfig
    ) {
        const canvasId = config.canvas.id;

        logger.debug(`Creating canvas using id '${canvasId}'.`);
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        if (!this.canvas) {
            throw new Error(`Unable to find canvas element using query '${canvasId}'!`);
        }

        // this.canvas.addEventListener('webglcontextcreationerror', (event: WebGLContextEvent) => {
        //     logger.critical('Failed to create WebGL context!', event.statusMessage);
        // });
        //
        // this.canvas.addEventListener('webglcontextlost', (event: WebGLContextEvent) => {
        //     logger.error('Lost WebGL context!', event.statusMessage);
        // });
        //
        // this.canvas.addEventListener('webglcontextrestored', (event: WebGLContextEvent) => {
        //     logger.error('Lost WebGL context!', event.statusMessage);
        // });
    }

    public setSize(width: number, height: number): void {
        logger.debug(`Resize (${width}, ${height}).`);
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public getWebGlContext(): WebGl {
        return this.canvas.getContext('webgl2', Object.assign({
            alpha: false,
        }, this.config.canvas.context)) as WebGl;
    }

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }
}
