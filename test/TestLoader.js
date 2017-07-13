ennj.module('test.TestLoader', ['ennj.Loader'], function(Loader) {
    'use strict';

    var loader = new Loader();

    loader.batch({
        sheet: [
            'res/terrain.png'
        ]
    });

    return loader;
});
