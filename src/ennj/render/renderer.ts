import { WebGl } from '../common';
import { RenderContext } from './render-context';


export abstract class Renderer {
    protected readonly gl: WebGl;

    protected constructor(gl: WebGl) {
        this.gl = gl;
    }

    public abstract destructor(): void;
    public abstract render(context: RenderContext): void;
}
