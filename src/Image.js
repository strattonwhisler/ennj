ennj.module('ennj.Image', ['ennj.Class'], function(Class) {
    'use strict';

    function Image(url) {
        this.url = url;

        if(ennj._loader && !ennj._loader.done) {
            ennj._loader.add('image', url);
        } else {
            load.call(this);
        }
    }

    Class.extend(Image, {

    });

    function load() {
        var image = new Image();
        image.src = this.url;
        image.onload = function () {

        };
        image.onerror = function() {

        };
    }

    return Image;
}, true)
