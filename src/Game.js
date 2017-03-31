ennj.module('ennj.Game', ['ennj.Class'], function(Class) {
    'use strict';

    function Game() {}

    Class.extend(Game, {
        init: init,
        update: update,
        draw: draw,
        drawUi: drawUi,
        destroy: destroy
    });

    function init() {}
    function update(delta) {}
    function draw(ctx) {}
    function drawUi(ctx) {}
    function destroy() {}

    return Game;
}, true);
