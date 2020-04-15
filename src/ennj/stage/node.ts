export abstract class Node {
    protected parent: Nullable<Node>;
    protected children: Array<Node>;

    constructor() {
        this.parent = null;
        this.children = new Array<Node>();
    }

    public abstract onUpdate(delta: number): void;

    public attachChild(node: Node): void {
        node.parent = node;
        this.children.push(node);
    }

    public detachChild(node: Node): void {
        node.parent = null;
        this.children.splice(this.children.indexOf(node), 1);
    }
}
