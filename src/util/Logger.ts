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
    private level: LogLevel;
    private file: string;

    constructor(level: LogLevel = LogLevel.INFO, file: string = null) {
        this.level = level;
        this.file = file;
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    private getTime(): string {
        let time = new Date();
        let text = '';

        text += time.getFullYear().toString().padStart(4, '0') + '-';
        text += (time.getMonth() + 1).toString().padStart(2, '0') + '-';
        text += time.getDate().toString().padStart(2, '0') + 'T';

        text += time.getHours().toString().padStart(2, '0') + ':';
        text += time.getMinutes().toString().padStart(2, '0') + ':';
        text += time.getSeconds().toString().padStart(2, '0') + '.';
        text += time.getMilliseconds().toString().padStart(3, '0');

        return text;
    }

    public log(level: LogLevel, parts: Array<any>, style: string, fullTrace: boolean = false): void {
        if(level > this.level) {
            return;
        }

        let message = parts.join(' ');
        let stack = (new Error()).stack;

        let file = this.file;
        if(!file) {
            file = stack.split('\n')[3].split('/').pop().split(':').splice(0, 2).join(':').trim();
        }

        console.log('%c' + this.getTime() + ' [' + LogLevel[level].padEnd(8) + '] [' + file + '] ' + message, style);

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
