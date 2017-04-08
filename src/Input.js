ennj.module('ennj.Input', [], function () {
    'use strict';

    function Input() {
        this._down = [],
        this._bound = {};

        var that = this;

        document.addEventListener('keydown', function(event) {
            keydown.call(that, event);
        });
        document.addEventListener('keyup', function(event) {
            keyup.call(that, event);
        });
    }

    Input.prototype.constructor = Input;
    Input.prototype.bind = bind;
    Input.prototype.unbind = unbind;
    Input.prototype.isKeyDown = isKeyDown;

    function keydown(event) {
        if(!this._down.includes(event.code)) {
            this._down.push(event.code);
        }
    }

    function keyup(event) {
        if(this._down.includes(event.code)) {
            this._down.splice(this._down.indexOf(event.code), 1);
        }
    }

    function isKeyDown(name) {
        for(var i = 0;i < this._bound[name].length;i++) {
            if(this._down.includes(this._bound[name][i])) {
                return true;
            }
        }
        return false;
    }

    function bind(name, key) {
        if(!this._bound[name]) {
            this._bound[name] = [key];
        } else {
            this._bound[name].push(key);
        }
    }

    function unbind(name, key) {
        if(this._bound[name].includes(key)) {
            if(this._bound[length].length === 1) {
                delete this._bound[name];
            } else {
                this._bound[name].splice(this._bound[name].indexOf(key), 1);
            }
        } else {
            logger.error('Name not bound: ' + name);
            throw 'Name not bound: ' + name;
        }
    }

    this.input = new Input();

    return Input;
}, true);
