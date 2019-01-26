function now(): number {
    return window.performance.now();
}

export class StopWatch {
    private startTime: number;
    private stopTime: number;

    public start(): void {
        this.startTime = now();
    }

    public stop(): void {
        this.stopTime = now();
    }

    public get time(): number {
        return (this.stopTime || now()) - this.startTime;
    }

    public toString(): string {
        return `${this.time.toFixed(2)} ms`;
    }
}

interface PerfMark {
    time: number;
}

export default class Perf {
    private marks: Map<string, PerfMark>;

    constructor() {
        this.marks = new Map<string, PerfMark>();
    }

    public mark(name: string): void {
        this.marks.set(name, { time: now() });
    }

    public time(startName: string, stopName: string): number {
        const start = this.marks.get(startName);
        const stop = this.marks.get(stopName);
        if(start && stop) {
            return stop.time - start.time;
        } else {
            return Number.MAX_VALUE;
        }
    }
}
