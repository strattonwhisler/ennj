var logger = (function() {
    'use strict';

    function Logger() {
        this.levels = {
            all: Number.MAX_SAFE_INTEGER,
            none: -1,
            trace: 6,
            debug: 5,
            info: 4,
            notice: 3,
            warning: 2,
            error: 1,
            critical: 0,
        };

        this.level = this.levels.info;
    }

    Logger.prototype.setLevel = setLevel;
    Logger.prototype.trace = trace;
    Logger.prototype.debug = debug;
    Logger.prototype.info = info;
    Logger.prototype.notice = notice;
    Logger.prototype.warning = warning;
    Logger.prototype.error = error;
    Logger.prototype.critical = critical;

    function setLevel(level) {
        this.level = level;
    }

    function getTime() {
        var time = new Date(),
            text = '';

        text += formatNumberLength(time.getFullYear(), 4) + '-';
        text += formatNumberLength(time.getMonth() + 1, 2) + '-';
        text += formatNumberLength(time.getDate(), 2) + 'T';

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

    function log(level, parts, style, fullTrace) {
        if(this.levels[level] > this.level) {
            return;
        }

        var message = parts.join(' '),
            stack = (new Error()).stack,
            file = stack.split('\n')[3].split('/').pop().split(':').splice(0, 2).join(':').trim();

        console.log('%c' + getTime() + ' [' + formatStringLength(level, 8) + '] [' + file + '] ' + message, style);

        if(fullTrace) {
            var trace = stack.split('\n');
            trace.splice(0, 3);
            for(var row in trace) {
                console.log('%c    ' + trace[row].trim(), style);
            }
        }
    }

    function trace() {
        log.call(this, 'trace', Array.from(arguments), 'color: #AF00AF;');
    }

    function debug() {
        log.call(this, 'debug', Array.from(arguments), 'color: #00AF00;');
    }

    function info() {
        log.call(this, 'info', Array.from(arguments), 'color: #3F3F3F;');
    }

    function notice() {
        log.call(this, 'notice', Array.from(arguments), 'color: #0000AF;');
    }

    function warning() {
        log.call(this, 'warning', Array.from(arguments), 'color: #AFAF00;');
    }

    function error() {
        log.call(this, 'error', Array.from(arguments), 'color: #AF0000;', true);
    }

    function critical() {
        log.call(this, 'critical', Array.from(arguments), 'color: #AF3F00;', true);
    }

    return new Logger();
})(logger || {});
