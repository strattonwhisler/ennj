import Renderer from './Renderer';
import Shader from './Shader';
import Sprite from '../asset/Sprite';

const vertex = `#version 300 es

in vec4 a_vertexPosition;
// in vec2 a_textureCoord;

// uniform mat4 u_modelViewMatrix;
// uniform mat4 u_viewMatrix;

// out vec2 v_textureCoord;

void main() {
    // gl_Position = u_viewMatrix * u_modelViewMatrix * a_vertexPosition;
    gl_Position = a_vertexPosition;

    // v_textureCoord = a_textureCoord;
}
`;

const fragment = `#version 300 es

precision mediump float;

// in vec2 v_textureCoord;

// uniform sampler2D u_texture;

out vec4 color;

void main() {
    // color = texture(u_texture, v_textureCoord);
    color = vec4(1.0f, 1.0f, 1.0f, 1.0f);
}
`;

export default class SpriteRenderer extends Renderer {
    public sprite: Sprite;

    private drawBuffer: WebGLBuffer;

    constructor(gl: WebGLRenderingContext) {
        super();

        if(!SpriteRenderer.shader) {
            const shader = new Shader(gl, vertex, fragment);
            shader.addAttibute(gl, 'a_vertexPosition');
            // shader.addUniform(gl, 'u_texture');

            SpriteRenderer.shader = shader;
        }

        this.drawBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.drawBuffer);
        const verticies = [
            1.0, 1.0,   // Top Right
            -1.0, 1.0,  // Top Left
            1.0, -1.0,  // Bottom Right
            -1.0, 1.0,  // Top Left
            1.0, -1.0,  // Bottom Right
            -1.0, -1.0  // Bottom Left
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, 0);
    }

    public render(gl: WebGLRenderingContext): void {
        SpriteRenderer.shader.bind(gl);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.drawBuffer);
        gl.vertexAttribPointer(SpriteRenderer.shader.getAttibute('a_vertexPosition'), 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(SpriteRenderer.shader.getAttibute('a_vertexPosition'));

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}
