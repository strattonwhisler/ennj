ennj.module('test.Test', ['ennj.Game', 'ennj.Loader', 'ennj.Sheet'], function(Game, Loader, Sheet) {
    'use strict';

    function Test() {
        // this.img = null;
        this._level = null;
        this._t = 0;
        this._x = 0;
        this._y = 0;
    }

    Game.extend(Test, {
        init: init,
        update: update,
        draw: draw,
        drawUi: drawUi,
        destroy: destroy
    });

    var ds,
        d,
        dd;

    var dLayers = [];

    function init() {
        this._level = ennj.require('test.level.Level1');

        for(var i = 0;i < this._level.layers.length;i++) {
            if(this._level.layers[i].type === 'draw') {
                dLayers.push(this._level.layers[i]);
            }
        }

        // this._img = new Sheet('res/terrain.png', 32, 32);

        // WASD
        ennj.input.bind('up', ennj.Key.W);
        ennj.input.bind('down', ennj.Key.S);
        ennj.input.bind('left', ennj.Key.A);
        ennj.input.bind('right', ennj.Key.D);

        // Arrow
        ennj.input.bind('up', ennj.Key.UP_ARROW);
        ennj.input.bind('down', ennj.Key.DOWN_ARROW);
        ennj.input.bind('left', ennj.Key.LEFT_ARROW);
        ennj.input.bind('right', ennj.Key.RIGHT_ARROW);

        // Controller Axis
        ennj.input.bind('up', ennj.Joy.axis.LEFT_Y, -1);
        ennj.input.bind('down', ennj.Joy.axis.LEFT_Y, 1);
        ennj.input.bind('left', ennj.Joy.axis.LEFT_X, -1);
        ennj.input.bind('right', ennj.Joy.axis.LEFT_X, 1);

        // Controller D-Pad
        ennj.input.bind('up', ennj.Joy.button.D_UP);
        ennj.input.bind('down', ennj.Joy.button.D_DOWN);
        ennj.input.bind('left', ennj.Joy.button.D_LEFT);
        ennj.input.bind('right', ennj.Joy.button.D_RIGHT);

        ennj.input.bind('skip', ennj.Key.P);

        ds = 500 / 8;
    }

    var lastdown = false,
        skip = 3;

    function update(delta) {
        var speed = 200 * delta;

        if(ennj.input.isDown('up')) this._y -= speed;
        if(ennj.input.isDown('down')) this._y += speed;
        if(ennj.input.isDown('left')) this._x -= speed;
        if(ennj.input.isDown('right')) this._x += speed;

        if(ennj.input.isDown('skip') && !lastdown) {
            skip++;
            skip %= 4;
            lastdown = true;
        }
        if(!ennj.input.isDown('skip')) {
            lastdown = false;
        }
    }

    function draw(ctx) {
        var rootMap = this._level.map;

        d = 0;
        dd = 0;

        for(var lay = 0;lay < dLayers.length;lay++) {
            if(lay === skip) {
                continue;
            }

            var data = dLayers[lay].data,
                map = rootMap.concat(dLayers[lay].map),
                width = dLayers[lay].width,
                height = dLayers[lay].height;

            var startX = Math.floor(-this._x / ds),
                startY = Math.floor(-this._y / ds),
                endX = startX + 14,
                endY = startY + 9;

            dd += width * height;

            for(var y = startY;y < endY;y++) {
                for(var x = startX;x < endX;x++) {
                    if(x < 0 || y < 0 || x > width - 1 || y > height - 1) {
                        continue;
                    }

                    var id = data[y][x];

                    if(id === 0) {
                        continue;
                    }

                    var range = null,
                        start = 0;
                    for(var i = 0;i < map.length;i++) {
                        if(id >= start && id < start + map[i].range) {
                            range = map[i];
                            break;
                        }
                        start += map[i].range
                    }

                    if(!range) {
                        logger.warning('Could not resolve id "' + id + '" from map');
                        break;
                    }

                    range.image.draw(ctx, (x * ds) + this._x, (y * ds) + this._y, id - start, ds);
                    d++;
                }
            }
        }
    }

    function drawUi(ctx) {
        // Night Hack
        // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // ctx.fillRect(0, 0, 800, 500);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, 0, 100, 55);
        ctx.fillStyle = '#000000';
        ctx.fillText(ennj.version, 5, 10);
        ctx.fillText(d + '/' + dd, 5, 40);
    }

    function destroy() {}

    return Test;
}, true);
