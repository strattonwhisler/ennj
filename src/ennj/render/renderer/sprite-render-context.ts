import { Texture } from '../texture';
import { Color } from '../../math/color';


export class SpriteRenderContext {
    public constructor(
        public texture: Nullable<Texture> = null,
        public color: Color = Color.White
    ) {
    }
}
