ennj.module('ennj.Sheet', ['ennj.Class'], function(Class) {
    'use strict';

    function Sheet(url, tileWidth, tileHeight) {
        this.url = url;
        this._image = null;
        this.loaded = false;

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.id = ennj.uuidv4();

        if(ennj._assets[url]) {
            this.loaded = true;
            this._image = ennj._assets[url].value;
            ennj._assets[url].loaders.push(this.id);

            this.width = this._image.width / this.tileWidth;
            this.height = this._image.height / this.tileHeight;
        } else {
            load.call(this, function() {
                this.loaded = true;
                this._image = ennj._assets[url].value;

                this.width = this._image.width / this.tileWidth;
                this.height = this._image.height / this.tileHeight;
            }, function() {
                logger.error('Failed to load image: "' + this.url + '"');
            });
        }
    }

    Class.extend(Sheet, {
        draw: draw,
        unload: unload
    });

    Sheet.once({
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

    function draw(ctx, x, y, id, ds) {
        if(this.loaded) {
            ctx.drawImage(
                this._image,
                (id % this.width) * this.tileWidth, Math.floor(id / this.width) * this.tileHeight, this.tileWidth, this.tileHeight,
                x, y, ds, ds
            );
        }
    }

    return Sheet;
}, true);
