ennj.module('ennj.Image', ['ennj.Class'], function(Class) {
    'use strict';

    function Image(url, loader) {
        this.url = url;
        this._image = null;
        this.loaded = false;

        this.loader = loader || null;

        if(ennj._assets[url]) {
            this._image = this._assets[url].value;
        } else {
            load.call(this);
        }
    }

    Class.extend(Image, {
        draw: draw
    });

    function load() {
        var image = new Image();
        image.src = this.url;
        image.onload = function () {
            this.loaded = true;
            if(this.loader) {
                this.loader.onLoad(this.url);
            }
        };
        image.onerror = function() {
            logger.error('Failed to load image: "' + url + '"');
        };
        ennj._assets[this.url] = {
            type: 'image',
            loaders: [this.id],
            value: image
        };
    }

    function draw(ctx, x, y) {
        if(this._image) {
            ctx.drawImage(this._image, x, y, this._image.width, this._image.height);
        }
    }

    return Image;
}, true)
