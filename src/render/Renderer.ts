import Shader from "ennj/render/Shader";

/**
 * Represents an empty renderer
 */
export default abstract class Renderer {
    /**
     * Shader used by the renderer
     */
    protected static shader: Shader;

    constructor() {
    }

    /**
     * Renders the given renderer
     * @param gl WebGL context
     */
    public abstract render(gl: WebGLRenderingContext): void;
}
