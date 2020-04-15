import { injectable } from '../di/injectable';


export type AssetPath = string;

type Asset = any;

@injectable()
export class AssetManager {
    private cache: Map<AssetPath, Asset>;

    public constructor() {
        this.cache = new Map<AssetPath, Asset>();
    }

    public get<T>(assetPath: AssetPath): T {
        return this.cache.get(assetPath) as T;
    }
}
