import { Engine } from 'ennj/core/Engine'
import { Game } from 'ennj/core/Game';
import { Loader } from 'ennj/asset/Loader';
import { Input } from 'ennj/core/Input';
import { Logger, LogLevel } from 'ennj/util/Logger';

declare const __filename: string;
const logger = new Logger(LogLevel.INFO, __filename);

export function main<G extends Game>(canvasId: string, game: G, loader: Loader, options: any): Engine<G> {
    logger.notice('Version ', 'ennj 1.2.0a');
    logger.notice('Agent   ', navigator.userAgent);
    logger.notice('Language', navigator.language);
    logger.notice('Cookies ', navigator.cookieEnabled);

    const engine = new Engine<G>(canvasId, game, options);

    loader.load()
        .then(() => {
            engine.start();
        })
        .catch((err) => {
            logger.critical(err);
        });

    return engine;
}
