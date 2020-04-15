import { Logger } from '../core/Logger';
import { Color } from '../math/color';
import { Vector2 } from '../math/vector2';
import { Vector3 } from '../math/vector3';
import { Vector4 } from '../math/vector4';
import { Matrix2 } from '../math/matrix2';
import { Matrix3 } from '../math/matrix3';
import { Matrix4 } from '../math/matrix4';
import type { AppliedFn, WebGl } from '../common';


const logger = new Logger('shader');

type GLUniformFn = (location: WebGLUniformLocation, ...args: any) => void;

function mapShaderType(gl: WebGl, type: GLenum): string {
    switch(type) {
        case gl.VERTEX_SHADER:
            return 'vertex';
        case gl.FRAGMENT_SHADER:
            return 'fragment';
        default:
            return 'unknown';
    }
}

export const FLOAT_SIZE = 4;

export class Shader {
    protected readonly gl: WebGl;

    protected readonly program: WebGLProgram;
    protected readonly vs: WebGLShader;
    protected readonly fs: WebGLShader;

    protected attributes: Map<string, GLint>;
    protected uniforms: Map<string, WebGLUniformLocation>;

    public constructor(
        gl: WebGl,
        vsSource: string,
        fsSource: string,
        attributes: Array<string>,
        uniforms: Array<string>
    ) {
        this.gl = gl;

        this.attributes = new Map<string, GLint>();
        this.uniforms = new Map<string, WebGLUniformLocation>();

        this.vs = this.createShader(gl.VERTEX_SHADER, vsSource);
        this.fs = this.createShader(gl.FRAGMENT_SHADER, fsSource);
        this.program = this.createProgram();

        attributes.forEach((attribute) => {
            this.findAttributeLocation(attribute);
        });

        uniforms.forEach((uniform) => {
            this.findUniformLocation(uniform);
        });
    }

    public destructor(): void {
        this.gl.deleteShader(this.vs);
        this.gl.deleteShader(this.fs);
        this.gl.deleteProgram(this.program);
    }

    public bind(): void {
        this.gl.useProgram(this.program);
    }

    public unbind(): void {
        this.gl.useProgram(null);
    }

    private createShader(type: GLenum, source: string): WebGLShader {
        logger.debug(`Creating shader: ${mapShaderType(this.gl, type)}`);
        const shader = this.gl.createShader(type);

        if(shader == null) {
            throw new Error('Failed to execute gl.createShader!');
        }

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if(!success) {
            const error = this.gl.getShaderInfoLog(shader);
            logger.error(`Failed to create shader:\n${error}`);
            this.gl.deleteShader(shader);
            throw new Error(`GLSL ${error}`);
        }

        return shader;
    }

    private createProgram(): WebGLProgram {
        logger.debug(`Creating shader program`);
        const program = this.gl.createProgram();

        if(program == null) {
            throw new Error('Failed to execute gl.createProgram!');
        }

        this.gl.attachShader(program, this.vs);
        this.gl.attachShader(program, this.fs);
        this.gl.linkProgram(program);

        const status = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if(!status) {
            const error = this.gl.getProgramInfoLog(program);
            logger.error(`Failed to create program:\n${error}`);
            this.gl.deleteShader(this.vs);
            this.gl.deleteShader(this.fs);
            this.gl.deleteProgram(program);
            throw new Error(`GLSL ${error}`);
        }

        return program;
    }

    private findAttributeLocation(name: string): void {
        const location = this.gl.getAttribLocation(this.program, name);
        if(location !== -1) {
            this.attributes.set(name, location);
        } else {
            const message = `Couldn't find shader attribute: ${name}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    public getAttibuteLocation(name: string): GLint {
        var location = this.attributes.get(name);
        if(location !== undefined) {
            return location;
        } else {
            const message = `Unknown shader attribute: ${name}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    private findUniformLocation(name: string): void {
        const location = this.gl.getUniformLocation(this.program, name) as WebGLUniformLocation;
        if(location !== -1) {
            this.uniforms.set(name, location);
        } else {
            const message = `Couldn't find shader uniform: ${name}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    public getUniformLocation(name: string): WebGLUniformLocation {
        var location = this.uniforms.get(name);
        if(location !== undefined) {
            return location;
        } else {
            const message = `Unknown shader uniform: ${name}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    private applyUL(name: string, glfn: GLUniformFn): AppliedFn {
        var location = this.uniforms.get(name);
        if(location !== undefined) {
            return glfn.bind(this.gl, location);
        } else {
            const message = `Unknown shader uniform: ${name}`;
            logger.error(message);
            throw new Error(message);
        }
    }

    public setBool(name: string, a: boolean): void {
        this.applyUL(name, this.gl.uniform1i)(a ? 1.0 : 0.0);
    }

    public setInt(name: string, a: number): void {
        this.applyUL(name, this.gl.uniform1i)(a);
    }

    public setScalar(name: string, a: number): void {
        this.applyUL(name, this.gl.uniform1f)(a);
    }

    public setVector2(name: string, v: Vector2): void {
        this.applyUL(name, this.gl.uniform2f)(v.x, v.y);
    }

    public setVector3(name: string, v: Vector3): void {
        this.applyUL(name, this.gl.uniform3f)(v.x, v.y, v.z);
    }

    public setVector4(name: string, v: Vector4): void {
        this.applyUL(name, this.gl.uniform4f)(v.x, v.y, v.z, v.w);
    }

    public setColor(name: string, c: Color): void {
        this.applyUL(name, this.gl.uniform4f)(c.r, c.g, c.b, c.a);
    }

    public setMatrix2(name: string, matrix: Matrix2): void {
        this.applyUL(name, this.gl.uniformMatrix2fv)(false, Float32Array.from(matrix.rawData));
    }

    public setMatrix3(name: string, matrix: Matrix3): void {
        this.applyUL(name, this.gl.uniformMatrix3fv)(false, Float32Array.from(matrix.rawData));
    }

    public setMatrix4(name: string, matrix: Matrix4): void {
        this.applyUL(name, this.gl.uniformMatrix4fv)(false, Float32Array.from(matrix.rawData));
    }

    public setTexture(name: string, id: WebGLUniformLocation): void {
        this.applyUL(name, this.gl.uniform1i)(id);
    }
}
