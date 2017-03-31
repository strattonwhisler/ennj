ennj.module('test.TestLoader', ['ennj.Loader'], function(Loader) {
    'use strict';

    var loader = new Loader();

    loader.batch({
        image: [
            'https://dummyimage.com/32x32/000/fff.png'
        ]
    });

    return loader;
});
