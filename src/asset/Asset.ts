/**
 * Represents a bare minimum asset
 */
abstract class Asset {
    /**
     * Asset cache
     */
    private static cache: Map<string, any> = new Map<string, any>();

    /**
     * Asset's url
     */
    protected url: string;

    /**
     * Has the asset been loaded
     */
    protected loaded: boolean;

    /**
     * Creates an asset
     * @constructor
     * @param url
     */
    constructor(url: string) {
        this.url = url;

        if(Asset.cache.has(this.url)) {
            this.restore();
            this.loaded = true;
        } else {
            this.loaded = false;
        }
    }

    /**
     * Loads the asset
     */
    public abstract load(): Promise<void>;

    /**
     * Restores the asset
     */
    protected abstract restore(): void;

    protected store(data: any): void {
        Asset.cache.set(this.url, data);
    }

    protected retrieve(): any {
        return Asset.cache.get(this.url);
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }
}

export default Asset;
