import Entity from './Entity';

class Scene {
    private entities: Array<Entity>;

    constructor() {
        this.entities = [];
    }

    public attachEntity(entity: Entity) {
        this.entities.push(entity);
    }

    public update(delta: number) {
        for(const entity of this.entities) {
            entity.update(delta);
        }
    }

    public render(gl: WebGLRenderingContext) {
        for(const entity of this.entities) {
            entity.render(gl);
        }
    }
}

export default Scene;
