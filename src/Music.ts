import { Asset } from './Asset';
import logger from './Logger';

export class Music extends Asset {
    private audio: HTMLAudioElement;

    constructor(url: string, audio: HTMLAudioElement) {
        super(url);

        this.audio = audio;

        logger.warning('Music type is unimplemented');
    }

    static load(url: string): Promise<Music> {
        return new Promise<Music>((resolve, reject) => {
            const audio = document.createElement('audio');
            audio.src = url;
            audio.onload = () => {
                resolve(new Music(url, audio));
            };
            audio.onerror = () => {
                const err = `Filed to load music "${url}"`;
                logger.error(err);
                reject(err);
            };
        });
    }
}
