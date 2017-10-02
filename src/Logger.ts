export enum LogLevel {
    ALL = Number.MAX_VALUE,
    NONE = -1,
    TRACE = 6,
    DEBUG = 5,
    INFO = 4,
    NOTICE = 3,
    WARNING = 2,
    ERROR = 1,
    CRITICAL = 0
}

export class Logger {
    constructor(private level: LogLevel = LogLevel.INFO) {
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    private getTime(): string {
        let time = new Date();
        let text = '';

        text += this.formatNumberLength(time.getFullYear(), 4) + '-';
        text += this.formatNumberLength(time.getMonth() + 1, 2) + '-';
        text += this.formatNumberLength(time.getDate(), 2) + 'T';

        text += this.formatNumberLength(time.getHours(), 2) + ':';
        text += this.formatNumberLength(time.getMinutes(), 2) + ':';
        text += this.formatNumberLength(time.getSeconds(), 2) + '.';
        text += this.formatNumberLength(time.getMilliseconds(), 3);

        return text;
    }

    private formatNumberLength(value: number, length: number): string {
        let text = '' + value;
        while (text.length < length) {
            text = '0' + text;
        }
        return text;
    }

    private formatStringLength(value: string, length: number): string {
        var text = '' + value;
        while (text.length < length) {
            text += ' ';
        }
        return text;
    }

    private log(level: LogLevel, parts: Array<any>, style: string, fullTrace: boolean = false): void {
        if(level > this.level) {
            return;
        }

        let message = parts.join(' ');
        let stack = (new Error()).stack;
        let file = stack.split('\n')[3].split('/').pop().split(':').splice(0, 2).join(':').trim();

        console.log('%c' + this.getTime() + ' [' + this.formatStringLength(LogLevel[level], 8) + '] [' + file + '] ' + message, style);

        if(fullTrace) {
            let trace = stack.split('\n');
            trace.splice(0, 3);
            for(let row of trace) {
                console.log('%c    ' + row.trim(), style);
            }
        }
    }

    public trace(...args: Array<any>): void {
        this.log(LogLevel.TRACE, args, 'color: #AF00AF;');
    }

    public debug(...args: Array<any>): void {
        this.log(LogLevel.DEBUG, args, 'color: #00AF00;');
    }

    public info(...args: Array<any>): void {
        this.log(LogLevel.INFO, args, 'color: #3F3F3F;');
    }

    public notice(...args: Array<any>): void {
        this.log(LogLevel.NOTICE, args, 'color: #0000AF;');
    }

    public warning(...args: Array<any>): void {
        this.log(LogLevel.WARNING, args, 'color: #AFAF00;');
    }

    public error(...args: Array<any>): void {
        this.log(LogLevel.ERROR, args, 'color: #AF0000;', true);
    }

    public critical(...args: Array<any>): void {
        this.log(LogLevel.CRITICAL, args, 'color: #AF3F00;', true);
    }
}

export default new Logger(LogLevel.ALL);
