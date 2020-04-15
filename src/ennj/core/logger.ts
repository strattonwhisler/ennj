export enum LogLevel {
    All = Number.MAX_VALUE,
    None = -1,
    Trace = 60,
    Debug = 50,
    Info = 40,
    Notice = 30,
    Warning = 20,
    Error = 10,
    Critical = 0
}

type ConsoleMethod = (message?: any, ...optionalParams: any[]) => void;

export class Logger {
    private level: LogLevel;
    private scope: string;

    constructor(scope: string = 'global', level: LogLevel = LogLevel.All) {
        this.level = level;
        this.scope = scope;
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    public log(level: LogLevel, ...args: Array<any>): void {
        if(level > this.level) {
            return;
        }

        const method = this.resolveMethod(level);
        const time = this.resolveTime();
        const levelName = LogLevel[level].toLowerCase().padEnd(8);
        const message = this.resolveMessage(args);
        const style = this.resolveStyle(level);

        method(`%c${time} [${levelName}] [${this.scope}] ${message}`, style);
    }

    private resolveMethod(level: LogLevel): ConsoleMethod {
        switch(level) {
            case LogLevel.Trace:
                return console.trace;
            case LogLevel.Debug:
                return console.debug;
            case LogLevel.Info:
                return console.log;
            case LogLevel.Notice:
                return console.info;
            case LogLevel.Warning:
                return console.warn;
            case LogLevel.Error:
            case LogLevel.Critical:
                return console.error;
            default:
                return console.log;
        }
    }

    private resolveTime(): string {
        const time = new Date();

        const year = time.getFullYear().toString().padStart(4, '0');
        const month = (time.getMonth() + 1).toString().padStart(2, '0');
        const day = time.getDate().toString().padStart(2, '0');
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = time.getMinutes().toString().padStart(2, '0');
        const second = time.getSeconds().toString().padStart(2, '0');
        const millisecond = time.getMilliseconds().toString().padStart(3, '0');

        return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`;
    }

    private resolveMessage(args: Array<any>): string {
        return args.map((_) => _?.toString()).join(' ');
    }

    private resolveStyle(level: LogLevel): string {
        switch(level) {
            case LogLevel.Trace: return 'color: #AF00AF;';
            case LogLevel.Debug: return 'color: #00AF00;';
            // case LogLevel.Info: return 'color: #3F3F3F;'; // Light theme
            case LogLevel.Info: return 'color: #C1C1C1;'; // Dark theme
            // case LogLevel.Notice: return 'color: #0000AF;'; // Light theme
            case LogLevel.Notice: return 'color: #5050FF;'; // Dark theme
            case LogLevel.Warning: return 'color: #AFAF00;';
            case LogLevel.Error: return 'color: #AF0000;';
            case LogLevel.Critical: return 'color: #AF3F00;';
            default: return '';
        }
    }

    public trace = this.log.bind(this, LogLevel.Trace);
    public debug = this.log.bind(this, LogLevel.Debug);
    public info = this.log.bind(this, LogLevel.Info);
    public notice = this.log.bind(this, LogLevel.Notice);
    public warning = this.log.bind(this, LogLevel.Warning);
    public error = this.log.bind(this, LogLevel.Error);
    public critical = this.log.bind(this, LogLevel.Critical);
}
