import { AssetPath } from './asset-manager';


export const REFLECT_ASSETS_KEY = Symbol('ASSETS_METADATA_KEY');

export function assets<T>(assets: Array<AssetPath>): (klass: Klass<T>) => void {
    return function (klass: Klass<T>): void {
        Reflect.defineMetadata(REFLECT_ASSETS_KEY, assets, klass);
    };
}
