/**
 * Represents a WebGL program.
 */
export default class Shader {
    /**
     * Vertex shader source
     */
    private vertexSource: string;

    /**
     * Fragment shader source
     */
    private fragmentSource:string;

    /**
     * Vertex shader
     */
    private vertex: WebGLShader;

    /**
     * Fragment shader
     */
    private fragment: WebGLShader;

    /**
     * Shader program
     */
    private program: WebGLProgram;

    /**
     * Shader attibutes
     */
    private attibutes: Map<string, number>;

    /**
     * Shader attibutes
     */
    private uniforms: Map<string, WebGLUniformLocation>;

    /**
     * Creates a Shader
     * @constructor
     * @param gl WebGL context
     * @param vertex Vertex shader source
     * @param fragment Fragment shader source
     */
    constructor(gl: WebGLRenderingContext, vertex: string, fragment: string) {
        this.vertexSource = vertex;
        this.fragmentSource = fragment;

        this.attibutes = new Map<string, number>();
        this.uniforms = new Map<string, WebGLUniformLocation>();

        this.compile(gl);
    }

    /**
     * Compiles and links the shader sources
     * @param gl WebGL context
     */
    private compile(gl: WebGLRenderingContext): void {
        // Create the shader
        this.vertex = gl.createShader(gl.VERTEX_SHADER);

        // Assign the source
        gl.shaderSource(this.vertex, this.vertexSource);

        // Compile the shader
        gl.compileShader(this.vertex);

        // Report any errors
        if(!gl.getShaderParameter(this.vertex, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this.vertex));
            gl.deleteShader(this.vertex);
            return;
        }

        // Create the shader
        this.fragment = gl.createShader(gl.FRAGMENT_SHADER);

        // Assign the source
        gl.shaderSource(this.fragment, this.fragmentSource);

        // Compile the shader
        gl.compileShader(this.fragment);

        // Report any errors
        if(!gl.getShaderParameter(this.fragment, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this.fragment));
            gl.deleteShader(this.fragment);
            return;
        }

        // Create the program
        this.program = gl.createProgram();

        // Attach the shaders
        gl.attachShader(this.program, this.vertex);
        gl.attachShader(this.program, this.fragment);

        // Link the program
        gl.linkProgram(this.program);

        // Report any errors
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(this.program));
            return;
        }
    }

    /**
     * Adds the given attibute's location
     * @param gl WebGL context
     * @param name Attribute name
     */
    public addAttibute(gl: WebGLRenderingContext, name: string): void {
        const id = gl.getAttribLocation(this.program, name);
        if(id !== -1) {
            this.attibutes.set(name, id);
        } else {
            console.error(`Could not add attribute '${name}'!`)
        }
    }

    /**
     * Returns the given attibute's location
     * @param name Attibute name
     */
    public getAttibute(name: string): number {
        return this.attibutes.get(name);
    }

    /**
     * Adds the given uniforms's location
     * @param gl WebGL context
     * @param name Uniform name
     */
    public addUniform(gl: WebGLRenderingContext, name: string): void {
        const id = gl.getUniformLocation(this.program, name);
        if(id !== -1) {
            this.uniforms.set(name, id);
        } else {
            console.error(`Could not add uniform '${name}'!`)
        }
    }

    /**
     * Returns the given uniform's location
     * @param name Uniform name
     */
    public getUniform(name: string): WebGLUniformLocation {
        return this.uniforms.get(name);
    }

    /**
     * Binds this shader to opengl
     * @param gl WebGL context
     */
    public bind(gl: WebGLRenderingContext): void {
        gl.useProgram(this.program);
    }

    /**
     * Sets a scalar uniform
     * @param gl WebGL context
     * @param name Uniform name
     * @param value Uniform value
     */
    public setUniform(gl: WebGLRenderingContext, name: string, value: number): void {
        gl.uniform1f(this.uniforms.get(name), value);
    }
}
