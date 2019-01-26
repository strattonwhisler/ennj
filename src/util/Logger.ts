export enum LogLevel {
    ALL = Number.MAX_VALUE,
    TRACE = 60,
    DEBUG = 50,
    INFO = 40,
    NOTICE = 30,
    WARNING = 20,
    ERROR = 10,
    CRITICAL = 0,
    NONE = -1
}

export default class Logger {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public log(level: LogLevel, message: any, color: string = '#000000'): void {
        const time = (new Date).toISOString();
        const fomattedLevel = LogLevel[level].padEnd(8);
        const fomattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
        console.log(`%c${time} [${this.name}][${fomattedLevel}] ${fomattedMessage}`, `color: ${color};`);
    }

    public trace(message: any): void {
        this.log(LogLevel.TRACE, message, '#AF00AF');
    }

    public debug(message: any): void {
        this.log(LogLevel.DEBUG, message, '#00AF00');
    }

    public info(message: any): void {
        this.log(LogLevel.INFO, message, '#3F3F3F');
    }

    public notice(message: any): void {
        this.log(LogLevel.NOTICE, message, '#0000AF');
    }

    public warning(message: any): void {
        this.log(LogLevel.WARNING, message, '#AFAF00');
    }

    public error(message: any): void {
        this.log(LogLevel.ERROR, message, '#AF0000');
    }

    public critical(message: any): void {
        this.log(LogLevel.CRITICAL, message, '#AF3F00');
    }
}

export const logger = new Logger('Temp');
