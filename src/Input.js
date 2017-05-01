ennj.module('ennj.Input', [], function () {
    'use strict';

    function Input() {
        this._state = {},
        this._bound = {
            key: {},
            mouse: {},
            // joybutton: {},
            // joyaxis: {}
        };

        // this._gamepads = [];

        var that = this;

        document.addEventListener('keydown', function(event) {
            event.preventDefault();
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

        // window.addEventListener("gamepadconnected", function(e) {
        //     that._gamepads.push(e);
        // }, false);
        // window.addEventListener("gamepaddisconnected", function(e) {
        //     that._gamepads.splice(that._gamepads.indexOf(e), 1);
        // }, false);
    }

    Input.prototype.constructor = Input;
    Input.prototype.bind = bind;
    Input.prototype.unbind = unbind;
    Input.prototype.isDown = isDown;
    Input.prototype.getDown = getDown;
    Input.prototype.getAxis = getAxis;
    // Input.prototype.update = update;

    // function update() {
    //     if(navigator.getGamepads()[0]) {
    //         for(var j = 0;j < navigator.getGamepads()[0].buttons.length;j++) {
    //             var button = navigator.getGamepads()[0].buttons[j];
    //
    //             if(this._bound['joybutton'][j]) {
    //                 for(var i = 0;i < this._bound['joybutton'][j].length;i++) {
    //                     var state = this._bound['joybutton'][j][i];
    //                     this._state[state.name].down = this._state[state.name].down || button.pressed;
    //                     this._state[state.name].axis = this._state[state.name].axis || button.value;
    //                 }
    //             }
    //         }
    //
    //         for(var j = 0;j < navigator.getGamepads()[0].axes.length;j++) {
    //             var axis = navigator.getGamepads()[0].axes[j];
    //
    //             if(this._bound['joyaxis'][j]) {
    //                 for(var i = 0;i < this._bound['joyaxis'][j].length;i++) {
    //                     var state = this._bound['joyaxis'][j][i],
    //                         absAxis = 0,
    //                         value = this._state[state.name].axis;
    //                     if(axis * state.axisDir > 0) {
    //                         absAxis = axis * state.axisDir;
    //                     }
    //                     if(absAxis < 0.1 && this._state[state.name].axis !== 0 && this._state[state.name].axis !== 1) {
    //                         value = 0;
    //                     }
    //                     this._state[state.name].down = this._state[state.name].down || absAxis > 0.1;
    //                     this._state[state.name].axis = (absAxis > 0.1) ? absAxis : value;
    //                 }
    //             }
    //         }
    //     }
    // }

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

    this.input = new Input();

    return Input;
}, true);
