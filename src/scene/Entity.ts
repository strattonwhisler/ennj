import Node from './Node';
import Renderer from '../render/Renderer';

class Entity extends Node {
    private activeRenderer: Renderer;

    constructor() {
        super();
    }

    public update(delta: number): void {};

    public render(gl: WebGLRenderingContext): void {
        this.activeRenderer.render(gl);
    };

    protected setRenderer(renderer: Renderer) {
        this.activeRenderer = renderer;
    }
}

export default Entity;
