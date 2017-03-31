var ennj = (function(ns) {
    'use strict';

    ns.logger = {
        setLevel: setLevel,
        log: log,
        debug: debug,
        info: info,
        notice: notice,
        warning: warning,
        error: error,
        critical: critical,

        levels: {
            all: Number.MAX_SAFE_INTEGER,
            debug: 5,
            info: 4,
            notice: 3,
            warning: 2,
            error: 1,
            critical: 0,
        }
    };

    var logLevel = ns.logger.levels.info;

    function setLevel(level) {
        logLevel = level;
    }

    function getTime() {
        var time = new Date(),
            text = '';

        text += formatNumberLength(time.getFullYear(), 4) + '-';
        text += formatNumberLength(time.getMonth(), 2) + '-';
        text += formatNumberLength(time.getDay(), 2) + 'T';

        text += formatNumberLength(time.getHours(), 2) + ':';
        text += formatNumberLength(time.getMinutes(), 2) + ':';
        text += formatNumberLength(time.getSeconds(), 2) + '.';
        text += formatNumberLength(time.getMilliseconds(), 3);

        return text;
    }

    function formatNumberLength(number, length) {
        var text = '' + number;
        while (text.length < length) {
            text = '0' + text;
        }
        return text;
    }

    function formatStringLength(string, length) {
        var text = '' + string;
        while (text.length < length) {
            text += ' ';
        }
        return text;
    }

    function log(level, parts, style) {
        if(ns.logger.levels[level] > logLevel) {
            return;
        }

        var message = parts.join(' '),
            file = (new Error()).stack.split('\n')[3].split('/').pop().split(':').splice(0, 2).join(':');

        console.log('%c' + getTime() + ' [' + formatStringLength(level, 8) + '] [' + file + '] ' + message, style);
    }

    function debug() {
        log('debug', [...arguments], 'color: #00AF00;');
    }

    function info() {
        log('info', [...arguments], 'color: #3F3F3F;');
    }

    function notice() {
        log('notice', [...arguments], 'color: #0000AF;');
    }

    function warning() {
        log('warning', [...arguments], 'color: #AFAF00;');
    }

    function error() {
        log('error', [...arguments], 'color: #AF0000;');
    }

    function critical() {
        log('critical', [...arguments], 'color: #AF3F00;');
    }

    return ns;
})(ennj || {});
