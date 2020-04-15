import { Component } from './component';
import { Node } from '../stage/node';


export class Actor extends Node {
    private components: Array<Component>;

    constructor() {
        super();

        this.components = new Array<Component>();
    }

    public onStart(delta: number): void {
        //Note: Override in child
    }

    public onStop(delta: number): void {
        //Note: Override in child
    }

    public onUpdate(delta: number): void {
        //Note: Override in child
    }

    protected attachComponent(component: Component): void {
        component.owner = this;
        this.components.push(component);
        component.onAttach();
    }

    protected detachComponent(component: Component): void {
        component.onDetach();
        delete component.owner;
        this.components.splice(this.components.indexOf(component), 1);
    }
}
