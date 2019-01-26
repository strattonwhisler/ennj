ennj.module('ennj.State', ['ennj.Class'], function(Class) {
    'use strict';

    function State() {}

    Class.extend(State, {
        init: init,
        update: update
    });

    function init() {}
    function update(delta) {}

    return State;
}, true);
