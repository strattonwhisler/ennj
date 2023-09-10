import {
  WebGLTextureMagFilterMode,
  WebGLTextureMinFilterMode,
  WebGLTextureWrapMode
} from './texture';

export interface TextureAsset {
  type: 'texture';
  url: string;
  wrapModeU?: WebGLTextureWrapMode;
  wrapModeV?: WebGLTextureWrapMode;
  minFilterMode?: WebGLTextureMinFilterMode;
  magFilterMode?: WebGLTextureMagFilterMode;
}
