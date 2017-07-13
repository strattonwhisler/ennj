var ennj = (function (ns) {
    'use strict';

    ns.version = 'ennj 1.1.0a';

    ns.main = main;
    ns.start = start;
    ns.stop = stop;

    var glid = 0;

    var ctx;

    var startTime = 0,
        delta = 0,
        secondDelta = 0,
        drawDelta = 0,
        updateRate = 1 / 60,
        drawRate = 60 / 1,
        ups = 0,
        dps = 0;

    var du = 0,
        dd = 0;

    function requestFrame(callback) {
        glid = requestAnimationFrame(callback);
    }

    function cancelFrame(id) {
        cancelAnimationFrame(id);
    }

    function start() {
        logger.info('Starting game');
        ns._game.init.call(ns._game);
        requestFrame(loop);
    }

    function loop(loopTime) {
        {
            ennj.input.poll();
            ns._game.update.call(ns._game, delta);

            if(drawDelta >= 1 / drawRate) {
                ctx.clearRect(0, 0, ns._config.width, ns._config.height);
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, ns._config.width, ns._config.height);

                ns._game.draw.call(ns._game, ctx);
                ns._game.drawUi.call(ns._game, ctx);

                ctx.fillStyle = '#000000';
                ctx.fillText('upd '+ du + ' dps ' + dd, 5, 25);

                dps++;

                drawDelta %= 1 / drawRate;
            }

            if(secondDelta >= 1) {
                // logger.debug('upd', ups, 'dps', dps);
                du = ups;
                dd = dps;
                ups = 0;
                dps = 0;
                secondDelta %= 1;
            }

            ups++;
        }

        delta = (loopTime - startTime) / 1000;
        startTime = loopTime;

        drawDelta += delta;
        secondDelta += delta;

        requestFrame(loop);
    }

    function stop() {
        logger.info('Stopping game');
        cancelFrame(glid);
        ns._game.destroy.call(ns._game);
    }

    function main(canvasId, gameModule, loaderModule, config) {
        logger.notice('Version ', ns.version);
        logger.notice('Agent   ', navigator.userAgent);
        logger.notice('Language', navigator.language);
        logger.notice('Cookies ', navigator.cookieEnabled);

        logger.info('Starting engine');

        preLoadModules();

        ns._config = config || {};
        // TODO: Add default config

        var canvas = document.getElementById(canvasId);
        ctx = canvas.getContext('2d');

        canvas.width = config.width;
        canvas.height = config.height;

        ctx.imageSmoothingEnabled = false;

        logger.notice('Using game "' + gameModule + '"');
        logger.notice('Using loader "' + loaderModule + '"');

        ns._assets = {};

        ns.input = new (ennj.require('ennj.Input'))();

        ns._game = new (ennj.require(gameModule))();

        ns._loader = ennj.require(loaderModule);

        ns._loader.onDone(function() {
            glid = start();
        });

        ns._loader.load();
    }

    function preLoadModules() {
        var modules = [
            'ennj.Class',
            'ennj.Loader',
            'ennj.Game',
            'ennj.State',
            'ennj.Image',
            'ennj.Sheet',
            'ennj.Input',
            'ennj.Key',
            'ennj.Mouse',
            'ennj.Joy',
            'ennj.Vector'
        ];

        for(var i = 0;i < modules.length;i++) {
            ennj.require(modules[i]);
        }
    }

    return ns;
}(ennj || {}));
