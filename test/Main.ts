import { main, Loader, Matrix } from '../src';
import { Test } from './Test';

window.onload = () => {
    const config = {
        width: 800,
        height: 500
    };

    const loader = new Loader();
    loader.addImage('res/terrain.png');

    const game = new Test();

    main('canvas', game, loader, config);
};
