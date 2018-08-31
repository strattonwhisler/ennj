#version 300 es

in vec4 vertexPosition;

uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;

void main() {
    gl_Position = viewMatrix * modelViewMatrix * vertexPosition;
}
