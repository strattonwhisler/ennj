import * as Constants from './di-constants';
import { Token } from './token';


export type TokenTypes = Map<number, Token<any>>;

export function getTokenTypes<T>(target: Klass<T>): TokenTypes {
    return Reflect.getOwnMetadata(Constants.PARAM_TOKENS, target) ?? new Map();
}

export function setParamTokens<T>(params: Array<Token<any>>, target: Klass<T>): void {
    const paramTokens: TokenTypes = getTokenTypes(target);

    params.forEach((token, index) => {
        if(!paramTokens.has(index)) {
            paramTokens.set(index, token);
        }
    });

    Reflect.defineMetadata(Constants.PARAM_TOKENS, paramTokens, target);
}

export function setParamToken<T>(token: Token<any>, index: number, target: Klass<T>): void {
    const paramTokens: TokenTypes = getTokenTypes(target);

    if(!paramTokens.has(index)) {
        paramTokens.set(index, token);
    }

    Reflect.defineMetadata(Constants.PARAM_TOKENS, paramTokens, target);
}
