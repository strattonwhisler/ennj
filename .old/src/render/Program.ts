import logger from 'ennj/util/Logger';

export class Program {
    private program: WebGLProgram;
    private vs: WebGLShader;
    private fs: WebGLShader;

    public attibutes: {[name: string]: number} = {};
    public uniforms: {[name: string]: WebGLUniformLocation} = {};

    public initProgram(gl: WebGLRenderingContext): void {
        if(!this.vs && !this.fs) {
            return;
        }

        logger.trace('Initializing shader program');
        this.program = gl.createProgram();

        gl.attachShader(this.program, this.vs);
        gl.attachShader(this.program, this.fs);

        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            logger.error('Failed to compile program');
            logger.info(gl.getProgramInfoLog(this.program));
            return;
        }
    }

    public addShader(gl: WebGLRenderingContext, type: number, source: string): void {
        const shader = gl.createShader(type);

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            logger.error('Failed to compile shader');
            logger.info(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return;
        }

        switch(type) {
            case gl.VERTEX_SHADER:
                this.vs = shader;
                break;
            case gl.FRAGMENT_SHADER:
                this.fs = shader;
                break;
        }
    }

    public addAttribute(gl: WebGLRenderingContext, name: string): void {
        const id = gl.getAttribLocation(this.program, name);
        if(id != -1) {
            this.attibutes[name] = id;
        } else {
            logger.error(`Attribute location not found for "${name}"`);
        }
    }

    public addUniform(gl: WebGLRenderingContext, name: string): void {
        const id = gl.getUniformLocation(this.program, name);
        if(id != -1) {
            this.uniforms[name] = id;
        } else {
            logger.error(`Uniform location not found for "${name}"`);
        }
    }

    get use(): WebGLProgram {
        return this.program;
    }
}
