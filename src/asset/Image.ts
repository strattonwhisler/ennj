import { Asset } from 'ennj/asset/Asset';
import { Loader } from 'ennj/asset/Loader';
import logger from 'ennj/util/Logger';

export class Image extends Asset {
    private image: HTMLImageElement;

    constructor(url: string, image: HTMLImageElement) {
        super(url);

        this.image = image;

        logger.warning('Image type is unimplemented');
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        if(this.image) {
            ctx.drawImage(this.image, x, y, width, height);
        }
    }

    static load(url: string): Promise<Image> {
        return new Promise<Image>((resolve, reject) => {
            const image = document.createElement('img');
            image.src = url;
            image.onload = () => {
                resolve(new Image(url, image));
            };
            image.onerror = () => {
                const err = `Filed to load image "${url}"`;
                logger.error(err);
                reject(Error(err));
            };
        });
    }

    static create(url: string): Image {
        const image = Loader.getCachedAsset(url) as Image
        if(image) {
            return image;
        } else {
            return new Image('UNLOADED', null);
        }
    }
}
