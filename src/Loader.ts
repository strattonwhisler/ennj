import { uuid, uuidv4 } from './UUID';
import { Asset } from './Asset';
import { Image } from './Image';
import { Sheet } from './Sheet';
import { Sound } from './Sound';
import { Music } from './Music';
import { Json } from './Json';
import logger from './Logger';

export class Loader {
    public readonly id: uuid = uuidv4();

    private static cache: {[url: string]: {loaders: Array<uuid>, asset: Asset}} = {};

    private queued: number = 0;
    private loaded: number = 0;
    private queue: Array<{type: string, url: string}> = [];

    private cacheAsset(asset: Asset): void {
        logger.trace(`Caching asset "${asset.url}"`);
        Loader.cache[asset.url] = {
            loaders: [this.id],
            asset
        };
    }

    private loadAsset(asset: {type: string, url: string}): Promise<Asset> {
        if(Loader.cache[asset.url]) {
            logger.trace(`Loading asset from cache "${asset.url}"`);
            Loader.cache[asset.url].loaders.push(this.id);
            this.loaded++;
            return Promise.resolve(Loader.cache[asset.url].asset);
        }

        switch(asset.type) {
            case 'image':
                return Image.load(asset.url)
                    .then((asset) => { this.loaded++; this.cacheAsset(asset); return asset; });
            case 'sheet':
                return Sheet.load(asset.url)
                    .then((asset) => { this.loaded++; this.cacheAsset(asset); return asset; });
            case 'sound':
                return Sound.load(asset.url)
                    .then((asset) => { this.loaded++; this.cacheAsset(asset); return asset; });
            case 'music':
                return Music.load(asset.url)
                    .then((asset) => { this.loaded++; this.cacheAsset(asset); return asset; });
            case 'json':
                return Json.load(asset.url)
                    .then((asset) => { this.loaded++; this.cacheAsset(asset); return asset; });
            default:
                const err = `Unknown asset type "${asset.type}" for "${asset.url}"`;
                logger.error(err);
                return Promise.reject(err);
        }
    }

    public load(): Promise<Asset[]> {
        logger.trace(`Loading assets for loader "${this.id}"`);
        return Promise.all(this.queue.map(asset => this.loadAsset(asset)));
    }

    public unload(): void {
        logger.trace(`Unloading assets for loader "${this.id}"`);
        for(let asset of this.queue) {
            const cached = Loader.cache[asset.url];
            if(cached) {
                if(cached.loaders.length === 1) {
                    logger.trace(`Uncacheing asset "${asset.url}"`);
                    delete Loader.cache[asset.url];
                } else {
                    logger.trace(`Unloading asset "${asset.url}"\n    ${cached.loaders.length - 1} refs left`);
                    cached.loaders.splice(cached.loaders.indexOf(this.id), 1);
                }
            }
        }
    }

    private addAsset(type: string, url: string): void {
        this.queue.push({ type, url });
        this.queued++;
    }

    public addBatch(list: {[type: string]: Array<string>}): void {
        for(let type in list) {
            for(let url of list[type]) {
                this.addAsset(type, url);
            }
        }
    }

    public addImage(url: string): void {
        this.addAsset('image', url);
    }

    public addSheet(url: string): void {
        this.addAsset('sheet', url);
    }

    public addSound(url: string): void {
        this.addAsset('sound', url);
    }

    public addMusic(url: string): void {
        this.addAsset('music', url);
    }

    public addJson(url: string): void {
        this.addAsset('json', url);
    }

    get progress(): number {
        return this.loaded / this.queued;
    }

    static getCachedAsset(url: string): Asset {
        logger.trace(`Fetching asset "${url}"`);
        if(Loader.cache[url]) {
            return Loader.cache[url].asset;
        } else {
            logger.error(`Attempted to get unloaded asset "${url}"`);
            return null;
        }
    }
}
