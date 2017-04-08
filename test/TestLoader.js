ennj.module('test.TestLoader', ['ennj.Loader'], function(Loader) {
    'use strict';

    var loader = new Loader();

    loader.batch({
        image: [
            '/res/grass.png',
            '/res/stone.png',
            '/res/sand.png'
        ]
    });

    return loader;
});
