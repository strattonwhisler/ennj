import { Matrix4 } from '../math/matrix4';


export class RenderContext {
    public constructor(
        public projectionMatrix: Matrix4,
        public viewMatrix: Matrix4,
        public modelMatrix: Matrix4
    ) {
    }
}
