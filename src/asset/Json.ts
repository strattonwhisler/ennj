import { Asset } from 'ennj/asset/Asset';
import logger from 'ennj/util/Logger';

export class Json extends Asset {
    constructor(url: string) {
        super(url);

        logger.warning('Json type is unimplemented');
    }

    static load(url: string): Promise<Json> {
        return new Promise<Json>((resolve, reject) => {
            resolve(new Json(url));
        });
    }
}
