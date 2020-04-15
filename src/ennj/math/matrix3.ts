const MATRIC_WIDTH = 3;
const MATRIC_SIZE = MATRIC_WIDTH * MATRIC_WIDTH;

export class Matrix3 {
    public static readonly Identity: Matrix3 = new Matrix3();

    private data: Array<number>;

    constructor(data: Array<number> = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
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
            throw new Error(`Invalid Matrix3 index: ${index}`);
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
            throw new Error(`Invalid Matrix3 index: ${index}`);
        }
        this.data[index] = value;
    }

    public add(m: this): Matrix3 {
        return new Matrix3([
            this.data[0] + m.data[0],
            this.data[1] + m.data[1],
            this.data[2] + m.data[2],
            this.data[3] + m.data[3],
            this.data[4] + m.data[4],
            this.data[5] + m.data[5],
            this.data[6] + m.data[6],
            this.data[7] + m.data[7],
            this.data[8] + m.data[8]
        ]);
    }

    public sub(m: this): Matrix3 {
        return new Matrix3([
            this.data[0] - m.data[0],
            this.data[1] - m.data[1],
            this.data[2] - m.data[2],
            this.data[3] - m.data[3],
            this.data[4] - m.data[4],
            this.data[5] - m.data[5],
            this.data[6] - m.data[6],
            this.data[7] - m.data[7],
            this.data[8] - m.data[8]
        ]);
    }

    public mul(k: number): Matrix3 {
        return new Matrix3([
            this.data[0] * k,
            this.data[1] * k,
            this.data[2] * k,
            this.data[3] * k,
            this.data[4] * k,
            this.data[5] * k,
            this.data[6] * k,
            this.data[7] * k,
            this.data[8] * k
        ]);
    }

    public dot(m: this): Matrix3 {
        const m0 = (this.data[0] * m.data[0]) + (this.data[1] * m.data[3]) + (this.data[2] * m.data[6]);
        const m1 = (this.data[0] * m.data[1]) + (this.data[1] * m.data[4]) + (this.data[2] * m.data[7]);
        const m2 = (this.data[0] * m.data[2]) + (this.data[1] * m.data[5]) + (this.data[2] * m.data[8]);

        const m3 = (this.data[3] * m.data[0]) + (this.data[5] * m.data[3]) + (this.data[5] * m.data[6]);
        const m4 = (this.data[3] * m.data[1]) + (this.data[5] * m.data[4]) + (this.data[5] * m.data[7]);
        const m5 = (this.data[3] * m.data[2]) + (this.data[5] * m.data[5]) + (this.data[5] * m.data[8]);

        const m6 = (this.data[6] * m.data[0]) + (this.data[7] * m.data[3]) + (this.data[8] * m.data[6]);
        const m7 = (this.data[6] * m.data[1]) + (this.data[7] * m.data[4]) + (this.data[8] * m.data[7]);
        const m8 = (this.data[6] * m.data[2]) + (this.data[7] * m.data[5]) + (this.data[8] * m.data[8]);

        return new Matrix3([
            m0, m1, m2,
            m3, m4, m5,
            m6, m7, m8
        ]);
    }

    public addEq(m: this): this {
        this.data[0] += m.data[0];
        this.data[1] += m.data[1];
        this.data[2] += m.data[2];
        this.data[3] += m.data[3];
        this.data[4] += m.data[4];
        this.data[5] += m.data[5];
        this.data[6] += m.data[6];
        this.data[7] += m.data[7];
        this.data[8] += m.data[8];
        return this;
    }

    public subEq(m: this): this {
        this.data[0] -= m.data[0];
        this.data[1] -= m.data[1];
        this.data[2] -= m.data[2];
        this.data[3] -= m.data[3];
        this.data[4] -= m.data[4];
        this.data[5] -= m.data[5];
        this.data[6] -= m.data[6];
        this.data[7] -= m.data[7];
        this.data[8] -= m.data[8];
        return this;
    }

    public mulEq(k: number): this {
        this.data[0] *= k;
        this.data[1] *= k;
        this.data[2] *= k;
        this.data[3] *= k;
        this.data[4] *= k;
        this.data[5] *= k;
        this.data[6] *= k;
        this.data[7] *= k;
        this.data[8] *= k;
        return this;
    }

    public dotEq(m: this): this {
        const m0 = (this.data[0] * m.data[0]) + (this.data[1] * m.data[3]) + (this.data[2] * m.data[6]);
        const m1 = (this.data[0] * m.data[1]) + (this.data[1] * m.data[4]) + (this.data[2] * m.data[7]);
        const m2 = (this.data[0] * m.data[2]) + (this.data[1] * m.data[5]) + (this.data[2] * m.data[8]);

        const m3 = (this.data[3] * m.data[0]) + (this.data[5] * m.data[3]) + (this.data[5] * m.data[6]);
        const m4 = (this.data[3] * m.data[1]) + (this.data[5] * m.data[4]) + (this.data[5] * m.data[7]);
        const m5 = (this.data[3] * m.data[2]) + (this.data[5] * m.data[5]) + (this.data[5] * m.data[8]);

        const m6 = (this.data[6] * m.data[0]) + (this.data[7] * m.data[3]) + (this.data[8] * m.data[6]);
        const m7 = (this.data[6] * m.data[1]) + (this.data[7] * m.data[4]) + (this.data[8] * m.data[7]);
        const m8 = (this.data[6] * m.data[2]) + (this.data[7] * m.data[5]) + (this.data[8] * m.data[8]);

        this.data[0] = m0;
        this.data[1] = m1;
        this.data[2] = m2;
        this.data[3] = m3;
        this.data[4] = m4;
        this.data[5] = m5;
        this.data[6] = m6;
        this.data[7] = m7;
        this.data[8] = m8;

        return this;
    }
}
