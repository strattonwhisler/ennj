import { Matrix4 } from '../math/matrix4';
import { createOrthographicMatrix4, createPerspectiveMatrix4 } from '../math/matrix-utils';
import { injectable } from '../di/injectable';
import { Canvas } from './canvas';
import { RenderPipeline } from './render-pipeline';


export enum ProjectionMode {
    Orthographic,
    Perspective
}

@injectable()
export class Camera {
    private _viewMatrix: Matrix4;

    private _projectionMode: ProjectionMode;
    private _projectionMatrix: Matrix4;

    private _fov: number;
    private _width: number;
    private _height: number;
    private _nearPlane: number;
    private _farPlane: number;

    constructor(
        private renderPipeline: RenderPipeline,
        private canvas: Canvas
    ) {
        this._viewMatrix = Matrix4.Identity;

        this._projectionMode = ProjectionMode.Orthographic;
        this._projectionMatrix = Matrix4.Identity;

        this._fov = 80;
        this._width = 10;
        this._height = (this.canvas.height / this.canvas.width) * this._width;
        this._nearPlane = 0.01;
        this._farPlane = 100;

        this.updateProjectionMatrix();
    }

    public setActive(): void {
        this.renderPipeline.setActiveCamera(this);
    }

    public isActive(): boolean {
        return this.renderPipeline.getActiveCamera() === this;
    }

    private updateProjectionMatrix(): void {
        switch(this._projectionMode) {
            case ProjectionMode.Orthographic:
                const halfWidth = this._width / 2;
                const halfHeight = this._height / 2;
                this._projectionMatrix = createOrthographicMatrix4(
                    -halfWidth,
                    halfWidth,
                    halfHeight,
                    -halfHeight,
                    this._nearPlane,
                    this._farPlane
                );
                break;
            case ProjectionMode.Perspective:
                this._projectionMatrix = createPerspectiveMatrix4(
                    this._fov,
                    this._nearPlane,
                    this._farPlane
                );
            default:
                throw new Error('Unknown projection mode!');
        }
    }

    public get viewMatrix(): Matrix4 {
        return this._viewMatrix;
    }

    public get projectionMatrix(): Matrix4 {
        return this._projectionMatrix;
    }

    get fov(): number {
        return this._fov;
    }

    set fov(value: number) {
        this._fov = value;
        this.updateProjectionMatrix();
    }

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
        this.updateProjectionMatrix();
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = value;
        this.updateProjectionMatrix();
    }

    public get nearPlane(): number {
        return this._nearPlane;
    }

    public set nearPlane(value: number) {
        this._nearPlane = value;
        this.updateProjectionMatrix();
    }

    public get farPlane(): number {
        return this._farPlane;
    }

    public set farPlane(value: number) {
        this._farPlane = value;
        this.updateProjectionMatrix();
    }
}
