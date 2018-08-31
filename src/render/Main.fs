#version 300 es

precision mediump float;

in vec2 v_textureCoord;

uniform sampler2D u_texture;

out vec4 color;

void main() {
    color = texture(u_texture, v_textureCoord);
}
