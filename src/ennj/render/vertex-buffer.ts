import { WebGl } from '../common';


export class VertexBuffer {
    private readonly gl: WebGl;

    private readonly buffer: WebGLBuffer;

    public constructor(gl: WebGl) {
        this.gl = gl;

        const buffer = gl.createBuffer();

        if(buffer == null) {
            throw new Error('Failed to execute gl.createBuffer!');
        }

        this.buffer = buffer;
    }

    public destructor(): void {
        this.gl.deleteBuffer(this.buffer);
    }

    public bind(): void {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    }

    public unbind(): void {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    public setData(data: Array<number>, mode: GLenum): void {
        this.bind();
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), mode);
    }
}
