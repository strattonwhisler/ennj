import { Component } from '../actor/component';
import { RenderPipeline } from '../render/render-pipeline';
import { injectable } from '../di/injectable';
import { Canvas } from '../render/canvas';


@injectable()
export class CameraComponent extends Component {
    constructor(
        private renderPipeline: RenderPipeline,
        private canvas: Canvas
    ) {
        super();
    }

    public onAttach(): void {
    }

    public onDetach(): void {
    }
}
