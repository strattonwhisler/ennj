ennj.module('ennj.Loader', ['ennj.Class'], function(Class) {
    'use strict';

    var lastId = 0;

    function Loader() {
        this.queued = 0;
        this.loaded = 0;
        this.queue = [];
        this.id = lastId++;
    }

    Class.extend(Loader, {
        batch: batch,
        add: add,
        load: load,
        unload: unload,
        onDone: onDone
    });

    function batch(res) {
        for(var key in res) {
            for(var i = 0;i < res[key].length;i++) {
                add.call(this, key, res[key][i]);
            }
        }
    }

    function add(type, url) {
        switch (type) {
            case 'image':
            case 'sound':
            case 'music': {
                break;
            }
            default: {
                throw 'Unknown asset type "' + type + '"';
            }
        }

        this.queue.push({
            type: type,
            url: url
        });

        this.queued++;
    }

    function loadImage(url) {
        var that = this;

        if(ennj.assets[url]) {
            ennj.assets[url].loaders.push(this.id);
            this.loaded++;
            if(this.queued === this.loaded) {
                this.callback.call(this.callbackScope);
            }
            return;
        }

        var image = new Image();
        image.src = url;
        image.onload = function () {
            that.loaded++;
            if(that.queued === that.loaded) {
                that.callback.call(that.callbackScope);
            }
        };

        ennj.assets[url] = {
            type: 'image',
            loaders: [this.id],
            value: image
        };
    }

    function load() {
        if(!ennj.assets) {
            ennj.assets = {};
        }

        for(var i = 0;i < this.queue.length;i++) {
            if(this.queue[i].type === 'image') {
                loadImage.call(this, this.queue[i].url);
            } else if(this.queue[i].type === 'sound') {
                // loadSound.call(this, this.queue[i].url);
            } else if(this.queue[i].type === 'music') {
                // loadMusic.call(this, this.queue[i].url);
            }
        }
    }

    function unload() {
        for(var i = 0;i < this.queue.length;i++) {
            var asset = ennj.assets[this.queue[i].url];

            if(!asset) {
                continue;
            }

            if(asset.loaders.includes(this.id)) {
                if(asset.loaders.length === 1) {
                    delete ennj.assets[this.queue[i].url];
                } else {
                    asset.loaders.splice(asset.loaders.indexOf(this.id), 1);
                }
            }
        }
    }

    function onDone(callback, scope) {
        this.callback = callback;
        this.callbackScope = scope
    }

    return Loader;
}, true);
