import { Actor } from '../ennj/actor/actor';
import { injectable } from '../ennj/di/injectable';
import { assets } from '../ennj/asset/assets';
// import { AnimationComponent } from '../ennj/components/animation.component';
import { inject } from '../ennj/di/inject';
import * as Tokens from '../ennj/core/tokens';
import { Construct } from '../ennj/di/construct';
import { SpriteRendererComponent } from '../ennj/components/sprite-renderer.component';
import { AssetManager } from '../ennj/asset/asset-manager';
import { Texture } from '../ennj/render/texture';

enum Asset {
    PlayerSheet = 'al://res/emilie.png'
}

@assets([
    Asset.PlayerSheet
])
@injectable()
class Player extends Actor {
    private renderer: SpriteRendererComponent;

    // private idleAnimation: AnimationComponent;
    // private walkAnimation: AnimationComponent;
    // private runAnimation: AnimationComponent;
    // private jumpAnimation: AnimationComponent;

    public constructor(
        @inject(Tokens.Construct) construct: Construct,
        assetManager: AssetManager
    ) {
        super();

        this.renderer = construct(SpriteRendererComponent);
        this.attachComponent(this.renderer);
        this.renderer.setTexture(assetManager.get<Texture>(Asset.PlayerSheet));

        // this.idleAnimation = construct(AnimationComponent);
        // this.attachComponent(this.idleAnimation);
        //
        // this.walkAnimation = construct(AnimationComponent);
        // this.attachComponent(this.walkAnimation);
        //
        // this.runAnimation = construct(AnimationComponent);
        // this.attachComponent(this.runAnimation);
        //
        // this.jumpAnimation = construct(AnimationComponent);
        // this.attachComponent(this.jumpAnimation);
    }

    public onStart(): void {

    }

    public onUpdate(delta: number): void {

    }
}
