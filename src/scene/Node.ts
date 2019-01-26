class Node {
    private _parent: Node;
    private children: Array<Node>;

    constructor(parent: Node = null) {
        this._parent = parent;
        this.children = [];
    }

    public attachChild(child: Node): void {
        this.children.push(child);
        child._parent = this;
    }

    public detachChild(child: Node): void {
        this.children.splice(this.children.indexOf(child));
        child._parent = null;
    }

    public get parent(): Node {
        return this._parent;
    }
}

export default Node;
