#version 300 es

in vec4 a_vertexPosition;
in vec2 a_textureCoord;

uniform mat4 u_modelViewMatrix;
uniform mat4 u_viewMatrix;

out vec2 v_textureCoord;

void main() {
    gl_Position = u_viewMatrix * u_modelViewMatrix * a_vertexPosition;

    v_textureCoord = a_textureCoord;
}
