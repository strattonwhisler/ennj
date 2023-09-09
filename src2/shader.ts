import { Logger } from "./logger";
import { Vector2 } from "./vector2";
import { Color } from "./color";
import { Vector4 } from "./vector4";
import { Matrix2 } from "./matrix2";
import { Matrix4 } from "./matrix4";

const logger = new Logger('shader');

export type AttributeMap<TKey extends string> = Record<string, TKey>;
export type UniformMap<TKey extends string> = Record<string, TKey>;

export const _FRAGMENT_SHADER: GLenum = 0x8B30;
export const _VERTEX_SHADER: GLenum = 0x8B31;

export type WebGLShaderType =
  | typeof _FRAGMENT_SHADER
  | typeof _VERTEX_SHADER
  ;

const SHADER_NAME = {
  [_FRAGMENT_SHADER]: 'fragment',
  [_VERTEX_SHADER]: 'vertex',
} as const satisfies Record<WebGLShaderType, string>;

function createShader(gl: WebGL, type: WebGLShaderType, source: string): WebGLShader {
  logger.debug(`Creating shader: ${SHADER_NAME[type]}`);
  const shader = gl.createShader(type);

  if (shader == null) {
    throw new Error('Failed to execute gl.createShader!');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if(!success) {
    const error = gl.getShaderInfoLog(shader);
    logger.error(`Failed to create shader:\n${error}`);
    gl.deleteShader(shader);
    throw new Error(`GLSL ${error}`);
  }

  return shader;
}

function createProgram(gl: WebGL, vertex: WebGLShader, fragment: WebGLShader): WebGLProgram {
  logger.debug(`Creating shader program`);
  const program = gl.createProgram();

  if (program == null) {
    throw new Error('Failed to execute gl.createProgram!');
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  const status = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!status) {
    const error = gl.getProgramInfoLog(program);
    logger.error(`Failed to create program:\n${error}`);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    gl.deleteProgram(program);
    throw new Error(`GLSL ${error}`);
  }

  return program;
}

function findAttributeLocation(gl: WebGL, program: WebGLProgram, name: string): GLint {
  const location = gl.getAttribLocation(program, name);
  if (location !== -1) {
    return location;
  } else {
    const message = `Couldn't find shader attribute: ${name}`;
    logger.error(message);
    throw new Error(message);
  }
}

function findUniformLocation(gl: WebGL, program: WebGLProgram, name: string): WebGLUniformLocation {
  const location = gl.getUniformLocation(program, name);
  if (location) {
    return location;
  } else {
    const message = `Couldn't find shader attribute: ${name}`;
    logger.error(message);
    throw new Error(message);
  }
}

export class Shader<
  TAttributeKey extends string,
  TUniformKey extends string
> implements Disposable {
  protected readonly program: WebGLProgram;
  protected readonly vertex: WebGLShader;
  protected readonly fragment: WebGLShader;

  protected attributes: Map<TAttributeKey, GLint>;
  protected uniforms: Map<TUniformKey, WebGLUniformLocation>;

  constructor(
    protected readonly gl: WebGL,
    vertexSource: string,
    fragmentSource: string,
    attributeMap: AttributeMap<TAttributeKey>,
    uniformMap: UniformMap<TUniformKey>
  ) {
    this.attributes = new Map();
    this.uniforms = new Map();

    this.vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    this.fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    this.program = createProgram(gl, this.vertex, this.fragment);

    for (const attribute of Object.values(attributeMap)) {
      this.attributes.set(attribute, findAttributeLocation(gl, this.program, attribute));
    }

    for (const uniform of Object.values(uniformMap)) {
      this.uniforms.set(uniform, findUniformLocation(gl, this.program, uniform));
    }
  }

  [Symbol.dispose](): void {
    this.gl.deleteShader(this.vertex);
    this.gl.deleteShader(this.fragment);
    this.gl.deleteProgram(this.program);
  }

  bind(): void {
    this.gl.useProgram(this.program);
  }

  unbind(): void {
    this.gl.useProgram(null);
  }

  getAttributeLocation(attribute: TAttributeKey): GLint {
    return this.attributes.get(attribute)!;
  }

  getUniformLocation(uniform: TUniformKey): WebGLUniformLocation {
    return this.uniforms.get(uniform)!;
  }

  setBoolean(name: TUniformKey, value: boolean): void {
    this.gl.uniform1i(this.uniforms.get(name)!, value ? 1 : 0);
  }

  setInteger(name: TUniformKey, value: number): void {
    this.gl.uniform1i(this.uniforms.get(name)!, value);
  }

  setScalar(name: TUniformKey, value: number): void {
    this.gl.uniform1f(this.uniforms.get(name)!, value);
  }

  setVector2(name: TUniformKey, value: Vector2): void {
    this.gl.uniform2f(this.uniforms.get(name)!, value.x, value.y);
  }

  setVector4(name: TUniformKey, value: Vector4): void {
    this.gl.uniform4f(this.uniforms.get(name)!, value.x, value.y, value.z, value.w);
  }

  setMatrix2(name: TUniformKey, value: Matrix2): void {
    this.gl.uniformMatrix2fv(this.uniforms.get(name)!, false, value.valueOf());
  }

  setMatrix4(name: TUniformKey, value: Matrix4): void {
    this.gl.uniformMatrix4fv(this.uniforms.get(name)!, false, value.valueOf());
  }

  setColor(name: TUniformKey, value: Color): void {
    this.gl.uniform4f(this.uniforms.get(name)!, value.r, value.g, value.b, value.a);
  }

  // setTexture(name: TUniformKey, value: WebGLUniformLocation): void {
  //   this.gl.uniform1i(this.uniforms.get(name)!, value);
  // }
}
