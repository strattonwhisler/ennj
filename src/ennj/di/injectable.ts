import * as Constants from './di-constants';
import { setParamTokens } from './di-helpers';


export function injectable<T>(): KClassDecorator<T> {
    return function <T>(target: Klass<T>): Klass<T> {
        //TODO: Fix
        // if(Reflect.hasOwnMetadata(Constants.PARAM_TOKENS, target)) {
        //     throw new Error('Duplicated injectable decorator');
        // }

        const paramsTypes = Reflect.getMetadata(Constants.DESIGN_PARAM_TYPES, target) ?? [];
        setParamTokens(paramsTypes, target);

        return target;
    }
}
