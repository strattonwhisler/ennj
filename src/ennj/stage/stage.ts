import { Node } from './node';

class RootNode extends Node {
    onUpdate(delta: number): void {
    }
}

export class Stage {
    protected rootNode: Node;

    constructor() {
        this.rootNode = new RootNode();
    }

    public update(delta: number): void {
        this.rootNode.onUpdate(delta);
    }
}
