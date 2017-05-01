ennj.module('test.TestLoader', ['ennj.Loader'], function(Loader) {
    'use strict';

    var loader = new Loader();

    loader.batch({
        image: [
            '/res/terrain.png'
        ]
    });

    return loader;
});
