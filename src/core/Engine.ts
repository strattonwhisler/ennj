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
    private uvBuffer: WebGLBuffer;

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
        this.program.addAttribute(this.gl, 'a_vertexPosition');
        this.program.addAttribute(this.gl, 'a_textureCoord');
        this.program.addUniform(this.gl, 'u_viewMatrix');
        this.program.addUniform(this.gl, 'u_modelViewMatrix');

        logger.debug('matrix');
        this.viewMatrix = Matrix.createOrthoMatrix(-4, 4, -2.5, 2.5, 0, -100);

        // Vertex buffer
        this.drawBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.drawBuffer);
        const verticies = [
            1.0, 1.0,   // Top Right
            -1.0, 1.0,  // Top Left
            1.0, -1.0,  // Bottom Right
            -1.0, 1.0,  // Top Left
            1.0, -1.0,  // Bottom Right
            -1.0, -1.0  // Bottom Left
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticies), this.gl.STATIC_DRAW);

        // 0,0----1,0
        //  |      |
        //  |      |
        // 0,1----1,1

        // UV buffer
        this.uvBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer);
        const uvs = [
            1, 1,
            0, 1,
            1, 0,
            0, 1,
            1, 0,
            0, 0,
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(uvs), this.gl.STATIC_DRAW);

        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        const image = new Image();
        image.src = "res/terrain.png";
        image.addEventListener('load', () => {
            logger.debug('Loaded image');
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        });
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
    private time: number = 0;

    private draw() {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.drawBuffer);
        this.gl.vertexAttribPointer(this.program.attibutes['a_vertexPosition'], 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.program.attibutes['a_vertexPosition']);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvBuffer);
        this.gl.vertexAttribPointer(this.program.attibutes['a_textureCoord'], 2, this.gl.FLOAT, true, 0, 0);
        this.gl.enableVertexAttribArray(this.program.attibutes['a_textureCoord']);

        this.gl.useProgram(this.program.use);
        this.gl.uniformMatrix4fv(
            this.program.uniforms['u_viewMatrix'],
            false,
            this.viewMatrix.data
        );

        this.time += this.delta * Math.PI;
        const s = 10,
            x = Math.sin(this.time),
            y = Math.cos(this.time),
            z = 0;
        this.gl.uniformMatrix4fv(
            this.program.uniforms['u_modelViewMatrix'],
            false,
            [
                s, 0, 0, 0,
                0, s, 0, 0,
                0, 0, s, 0,
                x, y, z, 1
            ]
        );

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
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
