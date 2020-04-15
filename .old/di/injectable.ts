import defaultContainer, { DependencyContainer, LifeTime } from './dependency-container';
import { useClass } from './provider';
import { setTokenTypes } from './helpers';


export function Injectable<T>(
    lifetime: LifeTime = LifeTime.Instanced,
    container: DependencyContainer = defaultContainer
): KClassDecorator<T> {
    return function (target: Klass<T>): void {
        const params = Reflect.getOwnMetadata('design:paramtypes', target) ?? [];
        setTokenTypes(target, params);
        container.register(target, useClass(target), { lifetime: lifetime });
    }
}
