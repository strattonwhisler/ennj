import { Actor } from './actor';


export abstract class Component {
    public owner!: Actor;

    abstract onAttach(): void;
    abstract onDetach(): void;
}
