import { Shader } from './shader';
import { VertexBuffer } from './vertex-buffer';
import { VertexArray } from './vertex-array';
import { Texture } from './texture';
import { Matrix4 } from './matrix4';
import backgroundVs from './background.vs.glsl';
import backgroundFs from './background.fs.glsl';
import { Input } from './input';

const WIDTH = 800;
const HEIGHT = 600;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const gl = canvas.getContext('webgl2', {
  alpha: false,
}) as WebGL;

gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

function verts(width: number, height: number, pixelsPerUnit: number): Array<number> {
  const density = width / pixelsPerUnit;
  const w = 1 * density;
  const h = (height / width) * density;
  return [
    // x, y, u, v
    -w, -h,  0,  1,
    -w,  h,  0,  0,
    w, -h,  1,  1,
    w,  h,  1,  0
  ];
}

const attributes = {
  position: 'a_position',
  texcoord: 'a_texcoord'
} as const;

const uniforms = {
  modelMatrix: 'u_modelMatrix',
  texture: 'u_texture'
} as const;

const shader = new Shader(
  gl,
  backgroundVs,
  backgroundFs,
  attributes,
  uniforms
);

const image = new Image(1024, 1024);
image.src = 'terrain.png';

const vbo = new VertexBuffer(gl);
vbo.set(verts(image.width, image.height, 400), gl.STATIC_DRAW);

const vao = new VertexArray(gl);
vao.bind();
vbo.bind();
const positionLocation = shader.getAttributeLocation(attributes.position);
vao.setAttributePointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
const texcoordLocation = shader.getAttributeLocation(attributes.texcoord);
vao.setAttributePointer(texcoordLocation, 2, gl.FLOAT, false, 16, 8);
vbo.unbind();
vao.unbind();

const textureLocation = shader.getUniformLocation(uniforms.texture);

gl.activeTexture(gl.TEXTURE0);
const texture = new Texture(gl, image);

const modelMatrix = Matrix4.IDENTITY;

const input = new Input();



function update() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.1, 0.1, 0.1, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  shader.bind();

  shader.setMatrix4(uniforms.modelMatrix, modelMatrix);

  texture.bind();
  shader.setTexture(uniforms.texture, textureLocation);

  vao.bind();

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  vao.unbind();
  texture.unbind();
  shader.unbind();

  window.requestAnimationFrame(update);
}

setTimeout(() => {
  window.requestAnimationFrame(update);
}, 1000);
