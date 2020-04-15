import { WebGl } from '../common';


export class VertexArray {
    private readonly gl: WebGl;

    private readonly array: WebGLVertexArrayObject;

    public constructor(gl: WebGl) {
        this.gl = gl;

        const array = gl.createVertexArray();

        if(array == null) {
            throw new Error('Failed to execute gl.createVertexArray!');
        }

        this.array = array;
    }

    public destructor(): void {
        this.gl.deleteVertexArray(this.array);
    }

    public bind(): void {
        this.gl.bindVertexArray(this.array);
    }

    public unbind(): void {
        this.gl.bindVertexArray(null);
    }

    public enableAndSetAttributePointer(location: GLint, size: GLint, type: GLenum, normalize: boolean, stride: GLsizei, offset: GLsizeiptr): void {
        this.bind();
        this.gl.enableVertexAttribArray(location);
        this.gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
    }
}
