import { Game } from 'ennj/core/Game';
import { Input } from 'ennj/core/Input';
import { Program } from 'ennj/render/Program';
import { Matrix } from 'ennj/math/Matrix';
import logger from 'ennj/util/Logger';

import mainvs from 'ennj/render/Main.vs';
import mainfs from 'ennj/render/Main.fs';

export class Engine<G extends Game> {
    private game: G;

    private frameId: number;

    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private program: Program;
    private drawBuffer: WebGLBuffer;

    private startTime: number = 0;
    private delta: number = 0;

    public input: Input;

    public config: any;

    constructor(canvasId: string, game: G, config: any) {
        this.game = game;
        this.config = config;

        this.init(canvasId);
    }

    private init(canvasId: string): void {
        logger.trace('Initializing canvas');
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this.initGL();

        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;

        this.input = new Input();

        this.game.engine = this;
        this.game.input = this.input;
    }

    private initGL() {
        this.gl = this.canvas.getContext('webgl2') as WebGLRenderingContext;

        this.program = new Program();
        this.program.addShader(this.gl, this.gl.VERTEX_SHADER, mainvs);
        this.program.addShader(this.gl, this.gl.FRAGMENT_SHADER, mainfs);
        this.program.initProgram(this.gl);
        this.program.addAttribute(this.gl, 'vertexPosition');
        this.program.addUniform(this.gl, 'viewMatrix');
        this.program.addUniform(this.gl, 'modelViewMatrix');

        this.viewMatrix = Matrix.createOrthoMatrix(-8, 8, 5, -5, 0.1, 100);

        this.drawBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.drawBuffer);

        const positions = [
            2.0,  2.0,
            -2.0,  2.0,
            2.0, -2.0,
            -2.0, -2.0
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
    }

    private loop(loopTime: number): void {
        {
            this.input.poll();
            this.game.update(this.delta);

            this.draw();

            this.game.draw(this.gl);
            this.game.drawUi(this.gl);
        }

        this.delta = (loopTime - this.startTime) / 1000;
        this.startTime = loopTime;

        this.requestFrame();
    }

    private viewMatrix: Matrix;

    private draw() {
        this.gl.clearColor(0.0, 0.0, 1.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.drawBuffer);
        this.gl.vertexAttribPointer(this.program.attibutes['vertexPosition'], 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.program.attibutes['vertexPosition']);

        this.gl.useProgram(this.program.use);
        this.gl.uniformMatrix4fv(
            this.program.uniforms['viewMatrix'],
            false,
            this.viewMatrix.data
        );
        this.gl.uniformMatrix4fv(
            this.program.uniforms['modelViewMatrix'],
            false,
            [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, -1, 1
            ]
        );

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    private requestFrame(): void {
        this.frameId = requestAnimationFrame(this.loop.bind(this));
    }

    private cancelFrame(): void {
        cancelAnimationFrame(this.frameId);
    }

    public start(): void {
        logger.info('Starting engine');
        this.game.init();
        this.requestFrame();
    }

    public stop(): void {
        this.cancelFrame();
        this.game.destroy();
        logger.info('Stopping engine');
    }
}
