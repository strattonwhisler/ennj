import { Container } from './container';


export type Factory<T> = (container: Container) => T;
