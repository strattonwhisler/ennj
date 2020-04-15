import { setTokenTypes } from './helpers';


export function Inject<T>(klass: Klass<T>): KParameterDecorator<T> {
    return function (target: Klass<T>, propertyKey: string | symbol, parameterIndex: number): void {
        setTokenTypes(target, klass, parameterIndex);
    }
}
