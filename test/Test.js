ennj.module('test.Test', ['ennj.Game', 'ennj.Loader'], function(Game, Loader) {
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

    function init() {
        // this.img = ennj._assets['https://dummyimage.com/32x32/000/fff.png'].value;
        this._level = ennj.require('test.level.Level1');

        // Arrow Keys
        ennj.input.bind('up', ennj.Key.UP_ARROW);
        ennj.input.bind('down', ennj.Key.DOWN_ARROW);
        ennj.input.bind('left', ennj.Key.LEFT_ARROW);
        ennj.input.bind('right', ennj.Key.RIGHT_ARROW);

        // WASD
        ennj.input.bind('up', ennj.Key.W);
        ennj.input.bind('down', ennj.Key.S);
        ennj.input.bind('left', ennj.Key.A);
        ennj.input.bind('right', ennj.Key.D);

        ds = 500 / 8;
    }

    function update(delta) {
        // this._t += delta * Math.PI;
        //
        // this._x = Math.sin(this._t) * 200 + 200;
        // this._y = Math.cos(this._t) * 200 + 200;
        //
        // if(this._t >= Math.PI * 2)
        //     this._t %= Math.PI * 2;

        var speed = 200 * delta;

        if(ennj.input.isKeyDown('up')) this._y -= speed;
        if(ennj.input.isKeyDown('down')) this._y += speed;
        if(ennj.input.isKeyDown('left')) this._x -= speed;
        if(ennj.input.isKeyDown('right')) this._x += speed;

        // this._x = this._x | 0;
        // this._y = this._y | 0;
    }

    function draw(ctx) {
        // ctx.drawImage(this.img, 0, 0, 128, 128);

        var data = this._level.layers[0].data,
            map = this._level.layers[0].map,
            width = this._level.layers[0].width,
            height = this._level.layers[0].height;

        var startX = Math.floor(-this._x / ds),
            startY = Math.floor(-this._y / ds),
            endX = startX + 14,
            endY = startY + 9;

        dd = width * height;

        d = 0;

        for(var y = startY;y < endY;y++) {
            for(var x = startX;x < endX;x++) {
                if(x < 0 || y < 0 || x > width - 1 || y > height - 1) {
                    continue;
                }

                var id = data[y][x];

                var image;
                if(map[id] === '/res/grass.png') {
                    image = ennj._assets['/res/grass.png'].value;
                } else if(map[id] === '/res/stone.png') {
                    image = ennj._assets['/res/stone.png'].value;
                } else if(map[id] === '/res/sand.png') {
                    image = ennj._assets['/res/sand.png'].value;
                } else {
                    logger.error('Unknown level data id: "' + id + '"');
                    continue;
                }

                ctx.drawImage(image, (x * ds) + this._x, (y * ds) + this._y, ds, ds);
                d++;
            }
        }
    }

    function drawUi(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, 0, 100, 55);
        ctx.fillStyle = '#FF0000';
        ctx.fillText(ennj.version, 5, 10);
        ctx.fillText(d + '/' + dd, 5, 40);
    }

    function destroy() {}

    return Test;
}, true);
