type Component = any;

export class Node {
    private parent: Node;

    private children: Array<Node>;

    private components: Array<Component>

    constructor() {
        this.children = [];
    }

    public update(delta: number): void {
        for(const component of this.components) {

        }

        for(const child of this.children) {
            child.update(delta);
        }
    }

    public draw(gl: WebGLRenderingContext): void {
        // Draw self
        for(const child of this.children) {
            child.draw(gl);
        }
    }

    public attachChild(child: Node): void {
        this.children.push(child);
    }

    public detachChild(child: Node): void {
        this.children.splice(this.children.indexOf(child), 1);
    }

    public attachComponent(component: Component): void {
        this.components.push(component);
    }

    public detachComponent(component: Component): void {

    }
}
