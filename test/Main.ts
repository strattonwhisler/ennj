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

    let engine = main('canvas', game, loader, config);

    // Play / Stop
    let playing = true;
    const play = document.createElement('button');
    play.innerHTML = 'Stop';
    play.onclick = () => {
        if(playing) {
            play.innerHTML = 'Play';
            engine.stop();
        } else {
            play.innerHTML = 'Stop';
            engine = main('canvas', game, loader, config);
        }
        playing = !playing;
    };
    document.body.appendChild(play);
};
