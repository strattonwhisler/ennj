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

export class Logger {
  constructor(
    private scope?: string,
    public level: LogLevel = LogLevel.All
  ) {}

  public log<TArgs extends Array<any>>(level: LogLevel, ...args: TArgs): void {
    if(level > this.level) {
      return;
    }

    // TODO: use formatted logs
    console.log(`[${this.scope}]`,...args);
  }

  public trace = this.log.bind(this, LogLevel.Trace);
  public debug = this.log.bind(this, LogLevel.Debug);
  public info = this.log.bind(this, LogLevel.Info);
  public notice = this.log.bind(this, LogLevel.Notice);
  public warning = this.log.bind(this, LogLevel.Warning);
  public error = this.log.bind(this, LogLevel.Error);
  public critical = this.log.bind(this, LogLevel.Critical);
}
