import { setParamToken } from './di-helpers';
import { Token } from './token';


export function inject<T>(token: Token<T>): KParameterDecorator<T> {
    return function (target: Klass<T>, propertyKey: string | symbol, parameterIndex: number): void {
        setParamToken(token, parameterIndex, target);
    }
}
