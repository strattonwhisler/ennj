import { Bindable } from "./interfaces";

/** @internal Copied from gl.REPEAT */
export const _REPEAT: 0x2901 = 0x2901;
/** @internal Copied from gl.CLAMP_TO_EDGE */
export const _CLAMP_TO_EDGE: 0x812F = 0x812F;
/** @internal Copied from gl.MIRRORED_REPEAT */
export const _MIRRORED_REPEAT: 0x8370 = 0x8370;

/**
 * Texture wrap mode (gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T). One of:
 * - repeat (gl.REPEAT)
 * - clampToEdge (gl.CLAMP_TO_EDGE)
 * - mirroredRepeat (gl.MIRRORED_REPEAT)
 */
export type WebGLTextureWrapMode =
  | 'repeat'
  | 'clampToEdge'
  | 'mirroredRepeat'
  ;

const TEXTURE_WRAP_MODES: Record<WebGLTextureWrapMode, GLenum> = {
  repeat: _REPEAT,
  clampToEdge: _CLAMP_TO_EDGE,
  mirroredRepeat: _MIRRORED_REPEAT
} as const;

/** @internal Copied from gl.NEAREST */
export const _NEAREST: 0x2600 = 0x2600;
/** @internal Copied from gl.LINEAR */
export const _LINEAR: 0x2601 = 0x2601;
/** @internal Copied from gl.NEAREST_MIPMAP_NEAREST */
export const _NEAREST_MIPMAP_NEAREST: 0x2700 = 0x2700;
/** @internal Copied from gl.LINEAR_MIPMAP_NEAREST */
export const _LINEAR_MIPMAP_NEAREST: 0x2701 = 0x2701;
/** @internal Copied from gl.NEAREST_MIPMAP_LINEAR */
export const _NEAREST_MIPMAP_LINEAR: 0x2702 = 0x2702;
/** @internal Copied from gl.LINEAR_MIPMAP_LINEAR */
export const _LINEAR_MIPMAP_LINEAR: 0x2703 = 0x2703;

/**
 * Texture minification filter mode (gl.TEXTURE_MIN_FILTER). One of:
 * - nearest (gl.NEAREST)
 * - linear (gl.LINEAR)
 * - nearestMipmapNearest (gl.NEAREST_MIPMAP_NEAREST)
 * - linearMipmapNearest (gl.LINEAR_MIPMAP_NEAREST)
 * - nearestMipmapLinear (gl.NEAREST_MIPMAP_LINEAR)
 * - linearMipmapLinear (gl.LINEAR_MIPMAP_LINEAR)
 */
export type WebGLTextureMinFilterMode =
  | 'nearest'
  | 'linear'
  | 'nearestMipmapNearest'
  | 'linearMipmapNearest'
  | 'nearestMipmapLinear'
  | 'linearMipmapLinear'
  ;

const TEXTURE_MIN_FILTER_MODES: Record<WebGLTextureMinFilterMode, GLenum> = {
  nearest: _NEAREST,
  linear: _LINEAR,
  nearestMipmapNearest: _NEAREST_MIPMAP_NEAREST,
  linearMipmapNearest: _LINEAR_MIPMAP_NEAREST,
  nearestMipmapLinear: _NEAREST_MIPMAP_LINEAR,
  linearMipmapLinear: _LINEAR_MIPMAP_LINEAR
};

/**
 * Texture magnification filter mode (gl.TEXTURE_MAG_FILTER). One of:
 * - nearest (gl.NEAREST)
 * - linear (gl.LINEAR)
 */
export type WebGLTextureMagFilterMode =
  | 'nearest'
  | 'linear'
  ;

const TEXTURE_MAG_FILTER_MODES: Record<WebGLTextureMagFilterMode, GLenum> = {
  nearest: _NEAREST,
  linear: _LINEAR,
};

interface TextureConfig {
  /**
   * Texture wrap mode (gl.TEXTURE_WRAP_S).
   * @default 'clampToEdge'
   */
  wrapModeS?: WebGLTextureWrapMode;
  /**
   * Texture wrap mode (gl.TEXTURE_WRAP_T).
   * @default 'clampToEdge'
   */
  wrapModeT?: WebGLTextureWrapMode;
  /**
   * Texture minification filter mode (gl.TEXTURE_MIN_FILTER).
   * @default 'nearest'
   */
  minFilterMode?: WebGLTextureMinFilterMode;
  /**
   * Texture magnification filter mode (gl.TEXTURE_MAG_FILTER).
   * @default 'nearest'
   */
  magFilterMode?: WebGLTextureMagFilterMode;
}

export function isPowerOf2 (value: number): boolean {
  return (value & (value - 1)) == 0;
}

export function isStatic (
  source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): boolean {
  return source instanceof HTMLImageElement ||
    source instanceof HTMLCanvasElement;
}

export class Texture implements Disposable, Bindable {
  protected readonly texture: WebGLTexture;

  constructor(
    protected readonly gl: WebGL,
    protected readonly source: HTMLImageElement | HTMLCanvasElement,
    protected readonly config: TextureConfig = {}
  ) {
    const texture = gl.createTexture();

    if (texture == null) {
      throw new Error('Failed to execute gl.createTexture!');
    }

    this.texture = texture;

    if (
      source instanceof HTMLCanvasElement ||
      source.complete
    ) {
      this.onload();
    } else {
      this.bind();
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255])
      );
      this.unbind();

      this.source.addEventListener('load', this.onload.bind(this));
    }
  }

  [Symbol.dispose] (): void {
    this.gl.deleteTexture(this.texture);
  }

  bind (): void {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }

  unbind (): void {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }

  private onload (): void {
    this.bind();

    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.source
    );

    if (
      isStatic(this.source) &&
      isPowerOf2(this.source.width) &&
      isPowerOf2(this.source.height)
    ) {
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      TEXTURE_WRAP_MODES[this.config.wrapModeS ?? 'clampToEdge']
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      TEXTURE_WRAP_MODES[this.config.wrapModeT ?? 'clampToEdge']
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      TEXTURE_MIN_FILTER_MODES[this.config.minFilterMode ?? 'nearest']
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      TEXTURE_MAG_FILTER_MODES[this.config.magFilterMode ?? 'nearest']
    );

    this.unbind();
  }
}
