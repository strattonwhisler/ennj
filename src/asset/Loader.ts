import Asset from './Asset';
import Sprite from './Sprite';
import Sheet from './Sheet';
import Sound from './Sound';
import Level from './Level';
import Prefab from './Prefab';
import Font from './Font';
import Logger from '../util/Logger';

const logger = new Logger('Loader');

/**
 * Valid asset types
 */
type AssetType = 'sprite' | 'sheet' | 'sound' | 'level' | 'prefab' | 'font';

/**
 * Represents a queue item
 */
class QueueItem {
    /**
     * Creates a queue items
     * @constructor
     * @param type Type of asset
     * @param url URL of asset
     */
    constructor(
        public type: AssetType,
        public url: string
    ) {}
}

/**
 * Class for loading assets
 */
class Loader {
    /**
     * Asset queue
     */
    private queue: Array<QueueItem>;

    /**
     * Number of assets loaded by this loader
     */
    private loaded: number;

    /**
     * Creates a new loader
     * @constructor
     */
    constructor() {
        this.queue = new Array<QueueItem>();

        this.loaded = 0;
    }

    /**
     * Adds an asset to the queue
     * @param type The type of the asset
     * @param url The url of the asset
     */
    private add(type: AssetType, url: string): void {
        this.queue.push(new QueueItem(type, url));
    }

    /**
     * Adds a sprite to the queue
     * @param url The url of the asset
     */
    public addSprite(url: string): void {
        this.add('sprite', url);
    }

    /**
     * Adds a sheet to the queue
     * @param url The url of the asset
     */
    public addSheet(url: string): void {
        this.add('sheet', url);
    }

    /**
     * Adds a sound to the queue
     * @param url The url of the asset
     */
    public addSound(url: string): void {
        this.add('sound', url);
    }

    /**
     * Adds a level to the queue
     * @param url The url of the asset
     */
    public addlevel(url: string): void {
        this.add('level', url);
    }

    /**
     * Adds a prefab to the queue
     * @param url The url of the asset
     */
    public addPrefab(url: string): void {
        this.add('prefab', url);
    }

    /**
     * Adds a font to the queue
     * @param url The url of the asset
     */
    public addFont(url: string): void {
        this.add('font', url);
    }

    /**
     * Loads an individual asset
     * @param item The item to load
     */
    private loadAsset(item: QueueItem): Promise<Asset> {
        return new Promise<Asset>((resolve, reject) => {
            let asset: Asset;

            switch(item.type) {
                case 'sprite':
                    asset = new Sprite(item.url);
                    break;
                case 'sheet':
                    asset = new Sheet(item.url);
                    break;
                case 'sound':
                    asset = new Sound(item.url);
                    break;
                case 'level':
                    asset = new Level(item.url);
                    break;
                case 'prefab':
                    asset = new Prefab(item.url);
                    break;
                case 'font':
                    asset = new Font(item.url);
                    break;
            }

            if(asset.isLoaded) {
                resolve(asset);
                return;
            }

            asset.load()
                .then(() => {
                    logger.debug(`Loaded ${item.type} '${item.url}'`);
                    resolve(asset);
                })
                .catch((error) => {
                    logger.error(`Failed to load ${item.type} '${item.url}'`);
                    reject(error);
                });
        });
    }

    /**
     * Loads all items in the queue
     */
    public load(): Promise<void> {
        logger.debug(`Load started`);
        const queued = this.queue.length;

        return new Promise<void>((resolve, reject) => {
            const success = (asset: any) => {
                this.loaded++;
                if(this.loaded == queued) {
                    resolve();
                }
            };

            const failure = (error: any) => {
                this.loaded++;
            };

            for(const item of this.queue) {
                this.loadAsset(item)
                    .then(success)
                    .catch(failure);
            }
        })
            .then(() => {
                logger.debug(`Load done`);
            });
    }
}

export default Loader;
