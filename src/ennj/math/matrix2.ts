const MATRIC_WIDTH = 2;
const MATRIC_SIZE = MATRIC_WIDTH * MATRIC_WIDTH;

export class Matrix2 {
    public static readonly Identity: Matrix2 = new Matrix2();

    private data: Array<number>;

    constructor(data: Array<number> = [
        1, 0,
        0, 1,
    ]) {
        this.data = data;
    }

    get rawData (): Readonly<Array<number>> {
        return this.data;
    }

    public get(index: number): number;
    public get(row: number, column: number): number;
    public get(ir: number, c?: number): number {
        const byIndex = arguments.length === 1;
        const index = byIndex ? ir : (ir * MATRIC_WIDTH) + (c as number);
        if (index >= MATRIC_SIZE) {
            throw new Error(`Invalid Matrix2 index: ${index}`);
        }
        return this.data[index];
    }

    public set(index: number, value: number): void;
    public set(row: number, column: number, value: number): void;
    public set(ir: number, vc: number, v?: number): void {
        const byIndex = arguments.length === 2;
        const index = byIndex ? ir : (ir * MATRIC_WIDTH) + vc;
        const value = byIndex ? vc : v as number;
        if (index >= MATRIC_SIZE) {
            throw new Error(`Invalid Matrix2 index: ${index}`);
        }
        this.data[index] = value;
    }

    public add(m: this): Matrix2 {
        return new Matrix2([
            this.data[0] + m.data[0],
            this.data[1] + m.data[1],
            this.data[2] + m.data[2],
            this.data[3] + m.data[3]
        ]);
    }

    public sub(m: this): Matrix2 {
        return new Matrix2([
            this.data[0] - m.data[0],
            this.data[1] - m.data[1],
            this.data[2] - m.data[2],
            this.data[3] - m.data[3]
        ]);
    }

    public mul(k: number): Matrix2 {
        return new Matrix2([
            this.data[0] * k,
            this.data[1] * k,
            this.data[2] * k,
            this.data[3] * k
        ]);
    }

    public dot(m: this): Matrix2 {
        const m0 = (this.data[0] * m.data[0]) + (this.data[1] * m.data[2]);
        const m1 = (this.data[0] * m.data[1]) + (this.data[1] * m.data[3]);

        const m2 = (this.data[2] * m.data[0]) + (this.data[3] * m.data[2]);
        const m3 = (this.data[2] * m.data[1]) + (this.data[3] * m.data[3]);

        return new Matrix2([
            m0, m1,
            m2, m3
        ]);
    }

    public addEq(m: this): this {
        this.data[0] += m.data[0];
        this.data[1] += m.data[1];
        this.data[2] += m.data[2];
        this.data[3] += m.data[3];
        return this;
    }

    public subEq(m: this): this {
        this.data[0] -= m.data[0];
        this.data[1] -= m.data[1];
        this.data[2] -= m.data[2];
        this.data[3] -= m.data[3];
        return this;
    }

    public mulEq(k: number): this {
        this.data[0] *= k;
        this.data[1] *= k;
        this.data[2] *= k;
        this.data[3] *= k;
        return this;
    }

    public dotEq(m: this): this {
        const m0 = (this.data[0] * m.data[0]) + (this.data[1] * m.data[2]);
        const m1 = (this.data[0] * m.data[1]) + (this.data[1] * m.data[3]);

        const m2 = (this.data[2] * m.data[0]) + (this.data[3] * m.data[2]);
        const m3 = (this.data[2] * m.data[1]) + (this.data[3] * m.data[3]);

        this.data[0] = m0;
        this.data[1] = m1;
        this.data[2] = m2;
        this.data[3] = m3;

        return this;
    }
}
