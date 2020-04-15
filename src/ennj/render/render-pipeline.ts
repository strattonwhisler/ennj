import { Renderer } from './renderer';
import { WebGl } from '../common';
import { Canvas } from './canvas';
import { injectable } from '../di/injectable';
import { inject } from '../di/inject';
import { Matrix4 } from '../math/matrix4';
import * as Tokens from '../core/tokens';
import { RenderObject } from './render-object';
import { RenderContext } from './render-context';
import { Camera } from './camera';


export enum RenderGroup {
    Default
}

@injectable()
export class RenderPipeline {
    private renderers: Map<Klass<Renderer>, Renderer>;
    private renderObjects: Array<RenderObject<any>>;

    private context: RenderContext;
    private camera!: Camera;

    public constructor(
        @inject(Tokens.WebGl) private gl: WebGl,
        private canvas: Canvas
    ) {
        this.renderers = new Map<Klass<Renderer>, Renderer>();
        this.renderObjects = new Array<RenderObject<any>>();

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);

        //TODO: Enable culling
        // gl.enable(gl.CULL_FACE);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.context = new RenderContext(
            Matrix4.Identity,
            Matrix4.Identity,
            Matrix4.Identity
        );
    }

    public destructor(): void {
        this.renderers.forEach((renderer) => {
            renderer.destructor();
        });
    }

    public render(): void {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // this.context.viewMatrix = this.camera.viewMatrix;
        // this.context.projectionMatrix = this.camera.projectionMatrix;

        for(const renderObject of this.renderObjects) {
            const rendererKlass = renderObject.getRenderer();



            // renderer.render(renderObject.getRenderContext());
        }
    }

    public attach(renderObject: RenderObject<any>, group: RenderGroup = RenderGroup.Default): void {
        this.renderObjects.push(renderObject);
    }

    public detach(renderObject: RenderObject<any>): void {
        this.renderObjects.splice(this.renderObjects.indexOf(renderObject), 1);
    }

    public setActiveCamera(camera: Camera): void {
        this.camera = camera;
    }

    public getActiveCamera(): Camera {
        return this.camera;
    }
}
