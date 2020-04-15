import container from './dependency-container';


export function construct<T>(klass: Klass<T>): T {
    return container.resolve<T>(klass);
}
