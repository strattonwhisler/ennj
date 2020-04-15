#version 300 es

precision mediump float;

in vec2 v_texcoord;
uniform sampler2D u_texture;

out vec4 o_color;

void main() {
    o_color = texture(u_texture, v_texcoord);
}
