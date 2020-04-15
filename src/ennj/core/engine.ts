import { Game } from './game';
import { Stage } from '../stage/stage';
import { Canvas } from '../render/canvas';
import { WebGl } from '../common';
import { EngineConfig } from './engine-config';
import { RenderPipeline } from '../render/render-pipeline';
import { Container } from '../di/container';
import * as Tokens from './tokens';
import { Scope } from '../di/scope';


export class Engine {
    private readonly container: Container;

    private config!: EngineConfig;

    private canvas!: Canvas;
    private gl!: WebGl;

    private game: Game;
    private renderPipeline!: RenderPipeline;
    private stage!: Stage;

    private frameId!: number;
    private delta!: number;
    private endTime!: number;

    public constructor(container: Container, game: Game) {
        this.container = container;
        this.game = game;
    }

    public init(): void {
        this.container.bind(Tokens.Construct).toValue(this.container.resolve.bind(this.container));

        this.container.bind(Canvas).toClass(Canvas).withScope(Scope.Singleton);
        this.container.bind(RenderPipeline).toClass(RenderPipeline).withScope(Scope.Singleton);

        this.config = this.game.config;

        this.container.bind<EngineConfig>(Tokens.EngineConfig).toValue(this.config);

        this.canvas = this.container.get(Canvas);
        this.canvas.setSize(
            this.config.canvas.width,
            this.config.canvas.height
        );

        this.gl = this.canvas.getWebGlContext();
        this.container.bind<WebGl>(Tokens.WebGl).toValue(this.gl);

        this.renderPipeline = this.container.get(RenderPipeline);

        this.container.bind(Stage).toClass(Stage);
        this.stage = this.container.get(Stage);

        this.container.bind(Engine).toValue(this);
        this.game.engine = this;

        this.game.onInit();
    }

    private loop(startTime: number): void {
        this.delta = (startTime - this.endTime) / 1000;
        this.endTime = startTime;

        this.requestFrame();

        this.game.onUpdate(this.delta);
        this.stage.update(this.delta);
        this.renderPipeline.render();
    }

    private requestFrame(): void {
        this.frameId = requestAnimationFrame(this.loop.bind(this));
    }

    private cancelFrame(): void {
        cancelAnimationFrame(this.frameId);
    }

    public start(): void {
        this.game.onStart();
        this.endTime = performance.now();
        this.requestFrame();
    }

    public stop(): void {
        this.game.onStop();
        this.cancelFrame();;
    }
}
