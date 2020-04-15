import { Game } from './game';
import { Engine } from './engine';
import { Container } from '../di/container';


export function bootstrap<T extends Game>(GameKlass: Klass<T>): Promise<void> {
    return new Promise<void>((resolve) => {
        document.addEventListener('DOMContentLoaded', _ => resolve());
    })
        .then(() => {
            const container = new Container();

            const game = container.resolve<T>(GameKlass);
            game.onBootstrap();

            const engine = new Engine(container, game);
            engine.init();
        });
}
