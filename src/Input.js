ennj.module('ennj.Input', ['ennj.Key', 'ennj.Mouse', 'ennj.Joy'], function () {
    'use strict';

    function Input() {
        this._state = {},
        this._bound = {
            key: {},
            mouse: {},
            joybutton: {},
            joyaxis: {}
        };

        this._gamepads = [];

        var that = this;

        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            // if(this._down['key'].)
            keydown.call(that, event);
        }, false);
        document.addEventListener('keyup', function(event) {
            event.preventDefault();
            keyup.call(that, event);
        }, false);

        document.addEventListener('mousedown', function(event) {
            event.preventDefault();
            mousedown.call(that, event);
        }, false);
        document.addEventListener('mouseup', function(event) {
            event.preventDefault();
            mouseup.call(that, event);
        }, false);

        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        }, false);

        // //TODO: Fix these
        // window.addEventListener('gamepadconnected', function(e) {
        //     logger.debug('Gamepad connected');
        //     that._gamepads.push(e.gamepad);
        // }, false);
        // window.addEventListener('gamepaddisconnected', function(e) {
        //     logger.debug('Gamepad disconnected');
        //     that._gamepads.splice(that._gamepads.indexOf(e.gamepad), 1);
        // }, false);
        // NOTE: A hack in the meantime
        this._gamepads[0] = navigator.getGamepads()[0];
    }

    Input.prototype.constructor = Input;
    Input.prototype.bind = bind;
    Input.prototype.unbind = unbind;
    Input.prototype.isDown = isDown;
    Input.prototype.getDown = getDown;
    Input.prototype.getAxis = getAxis;
    Input.prototype.poll = poll;

    function poll() {
        if(navigator.getGamepads()[0]) {
            var gamepad = navigator.getGamepads()[0];
            if(this._gamepads[0].timestamp !== gamepad.timestamp) {

                for(var j = 0;j < gamepad.buttons.length;j++) {
                    var button = gamepad.buttons[j];

                    if(this._bound['joybutton'][j]) {
                        for(var i = 0;i < this._bound['joybutton'][j].length;i++) {
                            var state = this._bound['joybutton'][j][i];
                            if(this._gamepads[0].buttons[j].pressed !== button.pressed) {
                                this._state[state.name].down = button.pressed;
                            }
                            if(this._gamepads[0].buttons[j].value !== button.value) {
                                this._state[state.name].axis = button.value;
                            }
                        }
                    }
                }

                // for(var j = 0;j < navigator.getGamepads()[0].axes.length;j++) {
                //     var axis = navigator.getGamepads()[0].axes[j];
                //
                //     if(this._bound['joyaxis'][j]) {
                //         for(var i = 0;i < this._bound['joyaxis'][j].length;i++) {
                //             var state = this._bound['joyaxis'][j][i],
                //                 absAxis = 0,
                //                 value = this._state[state.name].axis;
                //             if(axis * state.axisDir > 0) {
                //                 absAxis = axis * state.axisDir;
                //             }
                //             if(absAxis < 0.1 && this._state[state.name].axis !== 0 && this._state[state.name].axis !== 1) {
                //                 value = 0;
                //             }
                //             this._state[state.name].down = this._state[state.name].down || absAxis > 0.1;
                //             this._state[state.name].axis = (absAxis > 0.1) ? absAxis : value;
                //         }
                //     }
                // }

                this._gamepads[0] = gamepad;
            }
        }
    }

    function keydown(event) {
        if(this._bound['key'][event.code]) {
            for(var i = 0;i < this._bound['key'][event.code].length;i++) {
                var state = this._bound['key'][event.code][i];
                this._state[state.name].down = true;
                this._state[state.name].axis = 1;
            }
        }
    }

    function keyup(event) {
        if(this._bound['key'][event.code]) {
            for(var i = 0;i < this._bound['key'][event.code].length;i++) {
                var state = this._bound['key'][event.code][i];
                this._state[state.name].down = false;
                this._state[state.name].axis = 0;
            }
        }
    }

    function mousedown(event) {
        if(this._bound['mouse'][event.button]) {
            for(var i = 0;i < this._bound['mouse'][event.button].length;i++) {
                var state = this._bound['mouse'][event.button][i];
                this._state[state.name].down = true;
                this._state[state.name].axis = 1;
            }
        }
    }

    function mouseup(event) {
        if(this._bound['mouse'][event.button]) {
            for(var i = 0;i < this._bound['mouse'][event.button].length;i++) {
                var state = this._bound['mouse'][event.button][i];
                this._state[state.name].down = false;
                this._state[state.name].axis = 0;
            }
        }
    }

    function isDown(name) {
        if(this._state[name]) {
            return this._state[name].down;
        } else {
            logger.error('Unknown input event name: "' + name + '"');
            throw 'Unknown input event name: "' + name + '"';
        }
    }

    function getDown(name) {
        if(this._state[name]) {
            return this._state[name].down;
        } else {
            logger.error('Unknown input event name: "' + name + '"');
            throw 'Unknown input event name: "' + name + '"';
        }
    }

    function getAxis(name) {
        if(this._state[name]) {
            return this._state[name].axis;
        } else {
            logger.error('Unknown input event name: "' + name + '"');
            throw 'Unknown input event name: "' + name + '"';
        }
    }

    function bind(name, action, axisDir) {
        if(!this._bound[action[0]][action[1]]) {
            this._bound[action[0]][action[1]] = [{
                name: name,
                axisDir: axisDir || 1
            }];
        } else {
            this._bound[action[0]][action[1]].push({
                name: name,
                axisDir: axisDir || 1
            });
        }

        if(!this._state[name]) {
            this._state[name] = {
                down: false,
                axis: 0
            };
        }
    }

    function unbind(name, action) {
        // if(this._bound[name].includes(key)) {
        //     if(this._bound[length].length === 1) {
        //         delete this._bound[name];
        //     } else {
        //         this._bound[name].splice(this._bound[name].indexOf(key), 1);
        //     }
        // } else {
        //     logger.error('Name not bound: ' + name);
        //     throw 'Name not bound: ' + name;
        // }
    }

    return Input;
}, true);
