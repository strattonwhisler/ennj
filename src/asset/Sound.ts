import { Asset } from 'ennj/asset/Asset';
import logger from 'ennj/util/Logger';

export class Sound extends Asset {
    private audio: HTMLAudioElement;

    constructor(url: string, audio: HTMLAudioElement) {
        super(url);

        this.audio = audio;

        logger.warning('Sound type is unimplemented');
    }

    static load(url: string): Promise<Sound> {
        return new Promise<Sound>((resolve, reject) => {
            const audio = document.createElement('audio');
            audio.src = url;
            audio.onload = () => {
                resolve(new Sound(url, audio));
            };
            audio.onerror = () => {
                const err = `Filed to load sound "${url}"`;
                logger.error(err);
                reject(err);
            };
        });
    }
}
