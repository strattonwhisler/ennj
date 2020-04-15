import { Renderer } from './renderer';


export interface RenderObject<T> {
    getRenderContext(): T;

    getRenderer(): Klass<Renderer>;
}
