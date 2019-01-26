import { uuid, uuidv4 } from 'ennj/util/UUID';
import { Asset } from 'ennj/asset/Asset';
import { Image } from 'ennj/asset/Image';
import { Sheet } from 'ennj/asset/Sheet';
import { Sound } from 'ennj/asset/Sound';
import { Music } from 'ennj/asset/Music';
import { Json } from 'ennj/asset/Json';
import logger from 'ennj/util/Logger';

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

    private async loadAsset(asset: {type: string, url: string}): Promise<Asset> {
        if(Loader.cache[asset.url]) {
            logger.trace(`Loading asset from cache "${asset.url}"`);
            Loader.cache[asset.url].loaders.push(this.id);
            return Loader.cache[asset.url].asset;
        }

        switch(asset.type) {
            case 'image':
                return Image.load(asset.url);
            case 'sheet':
                return Sheet.load(asset.url);
            case 'sound':
                return Sound.load(asset.url);
            case 'music':
                return Music.load(asset.url);
            case 'json':
                return Json.load(asset.url);
            default:
                const err = `Unknown asset type "${asset.type}" for "${asset.url}"`;
                logger.error(err);
                throw Error(err);
        }
    }

    public async load(): Promise<Asset[]> {
        logger.trace(`Loading assets for loader "${this.id}"`);
        return Promise.all(this.queue.map(async (asset) => {
            const data = this.loadAsset(asset);
            this.cacheAsset(await data);
            this.loaded++;
            return data;
        }));
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
