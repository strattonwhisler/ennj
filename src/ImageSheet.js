ennj.module('ennj.ImageSheet', ['ennj.Image'], function() {
    'use strict';

    function ImageSheet(url, tilesX, tilesY, tileW, tileH) {
        this.url = url;
        this._image = null;
        this.loaded = false;

        if(ennj._assets[url]) {
            this._image = this._assets[url].value;
        } else {
            load.call(this);
        }
    }

    Class.extend(Image, {
        draw: draw
    });

    function draw() {

    }
}, true);
