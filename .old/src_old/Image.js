ennj.module('ennj.Image', ['ennj.Class'], function(Class) {
    'use strict';

    function Image(url) {
        this.url = url;
        this._image = null;
        this.loaded = false;

        this.id = ennj.uuidv4();

        if(ennj._assets[url]) {
            this.loaded = true;
            this._image = ennj._assets[url].value;
            ennj._assets[url].loaders.push(this.id);
        } else {
            load.call(this, function() {
                this.loaded = true;
                this._image = ennj._assets[url].value;
            }, function() {
                logger.error('Failed to load image: "' + this.url + '"');
            });
        }
    }

    Class.extend(Image, {
        draw: draw,
        unload: unload
    });

    Image.once({
        load: load
    });

    function load(success, error) {
        var that = this;

        var image = new window.Image();
        image.src = this.url;
        image.onload = function () {
            success.call(that);
        };
        image.onerror = function() {
            error.call(that);
        };

        ennj._assets[this.url] = {
            type: 'image',
            loaders: [this.id],
            value: image
        };
    }

    function unload() {
        var asset = ennj._assets[this.url];

        if(asset.loaders.includes(this.id)) {
            if(asset.loaders.length === 1) {
                delete ennj._assets[this.url];
            } else {
                asset.loaders.splice(asset.loaders.indexOf(this.id), 1);
            }
        }
    }

    function draw(ctx, x, y) {
        if(this.loaded) {
            ctx.drawImage(this._image, x, y, this._image.width, this._image.height);
        }
    }

    return Image;
}, true)
