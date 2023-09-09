export class VertexArray implements Disposable {
  protected readonly array: WebGLVertexArrayObject;

  constructor(
    protected readonly gl: WebGL
  ) {
    const array = gl.createVertexArray();

    if (array == null) {
      throw new Error('Failed to execute gl.createVertexArray!');
    }

    this.array = array;
  }

  [Symbol.dispose](): void {
    this.gl.deleteVertexArray(this.array);
  }

  bind(): void {
    this.gl.bindVertexArray(this.array);
  }

  unbind(): void {
    this.gl.bindVertexArray(null);
  }

  setAttributePointer(
    location: GLint,
    size: GLsizei,
    type: GLenum,
    normalized: GLboolean,
    stride: GLsizei,
    offset: GLsizeiptr
  ): void {
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(
      location,
      size,
      type,
      normalized,
      stride,
      offset
    );
  }
}
