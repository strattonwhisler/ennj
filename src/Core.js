var ennj = (function (ns) {
    'use strict';

    ns.version = 'ennj 1.0.0a';

    ns.main = main;
    ns.start = start;
    ns.stop = stop;

    ns.game = null;

    var glid = 0;

    var ctx,
        _config;

    var startTime = 0,
        delta = 0,
        secondDelta = 0,
        drawDelta = 0,
        updateRate = 1 / 60,
        drawRate = 30 / 1,
        ups = 0,
        dps = 0;

    function requestFrame(callback) {
        glid = requestAnimationFrame(callback) ||
            mozRequestAnimationFrame(callback) ||
            webkitRequestAnimationFrame(callback);
    }

    function cancelFrame(id) {
        cancelAnimationFrame(id);
    }

    function start() {
        ns.game.init.call(ns.game);
        requestFrame(loop);
    }

    function loop(loopTime) {
        {
            ns.game.update.call(ns.game, delta);

            if(drawDelta >= 1 / drawRate) {
                ctx.clearRect(0, 0, _config.width, _config.height);
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, _config.width, _config.height);

                ns.game.draw.call(ns.game, ctx);
                ns.game.drawUi.call(ns.game, ctx);

                dps++;

                drawDelta %= 1 / drawRate;
            }

            if(secondDelta >= 1) {
                ennj.logger.debug('upd', ups, 'dps', dps);
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
        cancelFrame(glid);
        ns.game.destroy.call(ns.game);
    }

    function main(canvasId, gameModule, loader, config) {
        var canvas = document.getElementById(canvasId);
        ctx = canvas.getContext('2d');

        if(!config) {
            config = {};
            config.width = 800;
            config.height = 500;
        }

        canvas.width = config.width;
        canvas.height = config.height;

        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;

        _config = config;

        ns.game = new (ennj.require(gameModule))();

        loader.onDone(function() {
            glid = start();
        });

        loader.load();
    }

    return ns;
}(ennj || {}));
