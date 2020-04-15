import { Renderer } from '../renderer';
import { Shader, FLOAT_SIZE } from '../shader';
import { WebGl } from '../../common';
import vs from './background.vs';
import fs from './background.fs';
import { VertexBuffer } from '../vertex-buffer';
import { VertexArray } from '../vertex-array';
import { Logger } from '../../core/logger';
import { Texture } from '../texture';
import { RenderContext } from '../render-context';


const logger = new Logger('renderer:sprite');

const enum Attribute {
    Position = 'a_position',
    TexCoord = 'a_texcoord'
}

const enum Uniform {
    Texture = 'u_texture',
    ProjectionMatrix = 'u_projectionMatrix',
    ViewMatrix = 'u_viewMatrix',
    ModelMatrix = 'u_modelMatrix'
}

function buildVertices(width: number, height: number, pixelsPerUnit: number): Array<number> {
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

export class SpriteRenderer extends Renderer {
    private shader: Shader;
    private vao: VertexArray;
    private vbo: VertexBuffer;
    private texture: Texture;

    private textureLocation: WebGLUniformLocation;

    constructor(gl: WebGl, image: HTMLImageElement, pixelsPerUnit: number = 100) {
        super(gl);

        logger.debug('Creating background renderer.');
        this.shader = new Shader(this.gl, vs, fs, [
            Attribute.Position,
            Attribute.TexCoord
        ], [
            Uniform.Texture,
            Uniform.ModelMatrix
        ]);

        this.vbo = new VertexBuffer(this.gl);
        this.vbo.setData(buildVertices(image.width, image.height, pixelsPerUnit), this.gl.STATIC_DRAW);
        this.vbo.unbind();

        this.vao = new VertexArray(this.gl);
        this.vbo.bind();

        const positionLocation = this.shader.getAttibuteLocation(Attribute.Position);
        this.vao.enableAndSetAttributePointer(positionLocation, 2, this.gl.FLOAT, false, FLOAT_SIZE * 4, 0);

        const texcoordLocation = this.shader.getAttibuteLocation(Attribute.TexCoord);
        this.vao.enableAndSetAttributePointer(texcoordLocation, 2, this.gl.FLOAT, true, FLOAT_SIZE * 4, FLOAT_SIZE * 2);

        this.vbo.unbind();
        this.vao.unbind();

        this.textureLocation = this.shader.getUniformLocation(Uniform.Texture);

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.texture = new Texture(this.gl, image);
    }

    public destructor(): void {
        logger.debug('Destroying background renderer.');
        this.vao.destructor();
        this.vbo.destructor();
        this.shader.destructor();
    }

    public render(context: RenderContext): void {
        this.shader.bind();

        this.shader.setMatrix4(Uniform.ProjectionMatrix, context.projectionMatrix);
        this.shader.setMatrix4(Uniform.ViewMatrix, context.viewMatrix);
        this.shader.setMatrix4(Uniform.ModelMatrix, context.modelMatrix);

        this.texture.bind();
        this.shader.setTexture(Uniform.Texture, this.textureLocation);

        this.vao.bind();

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        this.vao.unbind();
        this.texture.unbind()
        this.shader.unbind();
    }
}
