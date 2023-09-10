import { Bindable } from './interfaces';

export class VertexBuffer implements Disposable, Bindable {
  protected readonly buffer: WebGLBuffer;

  public constructor(protected readonly gl: WebGL) {
    const buffer = gl.createBuffer();

    if(buffer == null) {
      throw new Error('Failed to execute gl.createBuffer!');
    }

    this.buffer = buffer;
  }

  [Symbol.dispose](): void {
    this.gl.deleteBuffer(this.buffer);
  }

  bind(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  }

  unbind(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  set(data: Array<number>, mode: GLenum): void {
    this.bind();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), mode);
    this.unbind();
  }
}
