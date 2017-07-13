ennj.module('ennj.Loader', ['ennj.Class', 'ennj.Image', 'ennj.Sheet'], function(Class, Image, Sheet) {
    'use strict';

    function Loader() {
        this.queued = 0;
        this.loaded = 0;
        this.queue = [];
        this.id = ennj.uuidv4();
    }

    Class.extend(Loader, {
        batch: batch,
        addImage: addImage,
		addSheet: addSheet,
		// addSound: addSound,
		// addMusic: addMusic,
		// addModule: addModule,
		// addJson: addJson,
        load: load,
        unload: unload,
        onDone: onDone,
		onLoad: onLoad
    });

    function batch(res) {
        for(var key in res) {
            for(var i = 0;i < res[key].length;i++) {
                this.queue.push({
                    type: key,
                    url: res[key][i]
                });

                this.queued++;
            }
        }
    }

    function addImage(url) {
        this.queue.push({
            type: 'image',
            url: url
        });

        this.queued++;
    }

    function addSheet(url) {
        this.queue.push({
            type: 'sheet',
            url: url
        });

        this.queued++;
    }

    function checkAsset(url) {
        if(ennj._assets[url]) {
            ennj._assets[url].loaders.push(this.id);
            this.loaded++;
            if(this.queued === this.loaded) {
                this.callback.call(this.callbackScope);
            }
            return true;
        }
        return false;
    }

    function successCallback() {
        this.loaded++;
        if(this.queued === this.loaded) {
            this.callback.call(this.callbackScope);
        }
    }

    function errorCallback(type) {
        logger.error('Failed to load ' + type + ': "' + url + '"');
        this.loaded++;
        if(this.queued === this.loaded) {
            this.callback.call(this.callbackScope);
        }
    }

    function loadImage(url) {
        var that = this;

        if(checkAsset.call(this, url)) {
            return;
        }

        Image.load.call({
            url: url,
            id: this.id
        }, function() {
            successCallback.call(that);
        }, function() {
            errorCallback.call(that, 'image');
        });
    }

    function loadSheet(url) {
        var that = this;

        if(checkAsset.call(this, url)) {
            return;
        }

        Sheet.load.call({
            url: url,
            id: this.id
        }, function() {
            successCallback.call(that);
        }, function() {
            errorCallback.call(that, 'sheet');
        });
    }

    function load() {
        if(this.queue.length === 0) {
            this.callback.call(this.callbackScope);
        }

        for(var i = 0;i < this.queue.length;i++) {
            switch(this.queue[i].type) {
                case 'image':
                    loadImage.call(this, this.queue[i].url);
                    break;
                case 'sheet':
                    loadSheet.call(this, this.queue[i].url);
                    break;
                case 'sound':
                    // loadSound.call(this, this.queue[i].url);
                    break;
                case 'music':
                    // loadMusic.call(this, this.queue[i].url);
                    break;
                default:
                    logger.error('Unknown asset type "' +
                        this.queue[i].type + '" for "' +
                        this.queue[i].url + '"');
            }
        }
    }

    function unload() {
        for(var i = 0;i < this.queue.length;i++) {
            var asset = ennj._assets[this.queue[i].url];

            if(!asset) {
                continue;
            }

            if(asset.loaders.includes(this.id)) {
                if(asset.loaders.length === 1) {
                    delete ennj._assets[this.queue[i].url];
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
