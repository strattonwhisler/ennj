import { injectable } from '../di/injectable';
import { RenderGroup, RenderPipeline } from '../render/render-pipeline';
import { Color } from '../math/color';
import { SpriteRenderContext } from '../render/renderer/sprite-render-context';
import { Texture } from '../render/texture';
import { RenderObject } from '../render/render-object';
import { Renderer } from '../render/renderer';
import { SpriteRenderer } from '../render/renderer/sprite-renderer';
import { Component } from '../actor/component';


@injectable()
export class SpriteRendererComponent extends Component implements RenderObject<SpriteRenderContext> {
    private readonly context: SpriteRenderContext;
    private renderGroup: RenderGroup;

    public constructor(
        private renderPipeline: RenderPipeline
    ) {
        super();
        this.context = new SpriteRenderContext();
        this.renderGroup = RenderGroup.Default;
    }

    public onAttach(): void {
        this.renderPipeline.attach(this, this.renderGroup);
    }

    public onDetach(): void {
        this.renderPipeline.detach(this);
    }

    public setRenderGroup(renderGroup: RenderGroup): void {
        this.renderGroup = renderGroup;
    }

    public getRenderGroup(): RenderGroup {
        return this.renderGroup;
    }

    public setTexture(texture: Texture): void {
        this.context.texture = texture;
    }

    public getTexture(): Nullable<Texture> {
        return this.context.texture;
    }

    public setColor(color: Color): void {
        this.context.color = color;
    }

    public getColor(): Color {
        return this.context.color;
    }

    public getRenderContext(): SpriteRenderContext {
        return this.context;
    }

    public getRenderer(): Klass<Renderer> {
        return SpriteRenderer;
    }
}
