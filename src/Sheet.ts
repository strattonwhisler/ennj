import { Asset } from './Asset';
import logger from './Logger';

export class Sheet extends Asset {
    private image: HTMLImageElement;

    constructor(url: string, image: HTMLImageElement) {
        super(url);

        this.image = image;

        logger.warning('Sheet type is unimplemented');
    }

    static load(url: string): Promise<Sheet> {
        return new Promise<Sheet>((resolve, reject) => {
            const image = document.createElement('img');
            image.src = url;
            image.onload = () => {
                resolve(new Sheet(url, image));
            };
            image.onerror = () => {
                const err = `Filed to load sheet "${url}"`;
                logger.error(err);
                reject(err);
            };
        });
    }
}
