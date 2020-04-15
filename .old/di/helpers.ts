import { REFLECT_DI_TOKENTYPES } from './dependency-container';


export type TokenTypes = Map<number, Klass<unknown>>;

export function getTokenTypes<T>(target: Klass<T>): TokenTypes {
    return Reflect.getOwnMetadata(REFLECT_DI_TOKENTYPES, target) ?? new Map();
}

export function setTokenTypes<T>(target: Klass<T>, klass: Klass<unknown>, index: number): void;
export function setTokenTypes<T>(target: Klass<T>, klasses: Array<Klass<unknown>>): void;
export function setTokenTypes<T>(target: Klass<T>, klasses: Klass<unknown> | Array<Klass<unknown>>, index?: number): void {
    let tokenTypes: TokenTypes = getTokenTypes(target);

    if(klasses instanceof Array) {
        klasses.forEach((klass, index) => {
            if(!tokenTypes.has(index)) {
                tokenTypes.set(index, klass);
            }
        })
    } else {
        tokenTypes.set(index as number, klasses);
    }

    Reflect.defineMetadata(REFLECT_DI_TOKENTYPES, tokenTypes, target);
}
