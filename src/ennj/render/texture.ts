import { WebGl } from '../common';


function isPowerOf2(value: number): boolean {
    return (value & (value - 1)) == 0;
}

export class Texture {
    private readonly gl: WebGl;

    private readonly image: HTMLImageElement;
    private readonly texture: WebGLTexture;

    public constructor(gl: WebGl, image: HTMLImageElement) {
        this.gl = gl;
        this.image = image;

        this.texture = this.gl.createTexture() as WebGLTexture;
        this.bind();
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
        this.unbind();

        if(this.image.complete) {
            this.onImageLoad();
        } else {
            this.image.addEventListener('load', this.onImageLoad.bind(this));
        }
    }

    public destructor(): void {
        this.gl.deleteTexture(this.texture);
    }

    public bind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    public unbind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    private onImageLoad(): void {
        this.bind();

        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            this.image
        );

        if (
            isPowerOf2(this.image.width) &&
            isPowerOf2(this.image.height)
        ) {
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        } else {
            //TODO: Configure asset
            const wrapMode =
                // this.gl.REPEAT //default
                // this.gl.MIRRORED_REPEAT
                this.gl.CLAMP_TO_EDGE
            ;

            const minFilter =
                // this.gl.LINEAR
                this.gl.NEAREST
                // this.gl.NEAREST_MIPMAP_NEAREST
                // this.gl.LINEAR_MIPMAP_NEAREST
                // this.gl.NEAREST_MIPMAP_LINEAR //default
                // this.gl.LINEAR_MIPMAP_LINEAR
            ;

            const magFilter =
                // this.gl.LINEAR //default
                this.gl.NEAREST
            ;

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrapMode);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrapMode);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, minFilter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, magFilter);

        }

        this.unbind();
    }
}
