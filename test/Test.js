ennj.module('test.Test', ['ennj.Game', 'ennj.Loader'], function(Game, Loader) {
    'use strict';

    function Test() {
        this.img = null;
    }

    Game.extend(Test, {
        init: init,
        update: update,
        draw: draw,
        drawUi: drawUi,
        destroy: destroy
    });

    function init() {
        this.img = ennj.assets['https://dummyimage.com/32x32/000/fff.png'].value;
    }

    function update(delta) {}

    function draw(ctx) {
        ctx.drawImage(this.img, 0, 0, 128, 128);
    }

    function drawUi(ctx) {
        ctx.fillStyle = '#ff0000'
        ctx.fillText(ennj.version, 10, 20);
    }

    function destroy() {}

    return Test;
}, true);
