const MATRIC_WIDTH = 4;
const MATRIC_SIZE = MATRIC_WIDTH * MATRIC_WIDTH;

export class Matrix4 {
    public static readonly Identity: Matrix4 = new Matrix4();

    private data: Array<number>;

    constructor(data: Array<number> = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
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
            throw new Error(`Invalid matrix4 index: ${index}`);
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
            throw new Error(`Invalid matrix4 index: ${index}`);
        }
        this.data[index] = value;
    }

    public add(m: this): Matrix4 {
        return new Matrix4([
            this.data[0] + m.data[0],
            this.data[1] + m.data[1],
            this.data[2] + m.data[2],
            this.data[3] + m.data[3],
            this.data[4] + m.data[4],
            this.data[5] + m.data[5],
            this.data[6] + m.data[6],
            this.data[7] + m.data[7],
            this.data[8] + m.data[8],
            this.data[9] + m.data[9],
            this.data[10] + m.data[10],
            this.data[11] + m.data[11],
            this.data[12] + m.data[12],
            this.data[13] + m.data[13],
            this.data[14] + m.data[14],
            this.data[15] + m.data[15]
        ]);
    }

    public sub(m: this): Matrix4 {
        return new Matrix4([
            this.data[0] - m.data[0],
            this.data[1] - m.data[1],
            this.data[2] - m.data[2],
            this.data[3] - m.data[3],
            this.data[4] - m.data[4],
            this.data[5] - m.data[5],
            this.data[6] - m.data[6],
            this.data[7] - m.data[7],
            this.data[8] - m.data[8],
            this.data[9] - m.data[9],
            this.data[10] - m.data[10],
            this.data[11] - m.data[11],
            this.data[12] - m.data[12],
            this.data[13] - m.data[13],
            this.data[14] - m.data[14],
            this.data[15] - m.data[15]
        ]);
    }

    public mul(k: number): Matrix4 {
        return new Matrix4([
            this.data[0] * k,
            this.data[1] * k,
            this.data[2] * k,
            this.data[3] * k,
            this.data[4] * k,
            this.data[5] * k,
            this.data[6] * k,
            this.data[7] * k,
            this.data[8] * k,
            this.data[9] * k,
            this.data[10] * k,
            this.data[11] * k,
            this.data[12] * k,
            this.data[13] * k,
            this.data[14] * k,
            this.data[15] * k
        ]);
    }

    public dot(m: this): Matrix4 {
        const m0 = (this.data[0] * m.data[0]) + (this.data[1] * m.data[4]) + (this.data[2] * m.data[8]) + (this.data[3] * m.data[12]);
        const m1 = (this.data[0] * m.data[1]) + (this.data[1] * m.data[5]) + (this.data[2] * m.data[9]) + (this.data[3] * m.data[13]);
        const m2 = (this.data[0] * m.data[2]) + (this.data[1] * m.data[6]) + (this.data[2] * m.data[10]) + (this.data[3] * m.data[14]);
        const m3 = (this.data[0] * m.data[3]) + (this.data[1] * m.data[7]) + (this.data[2] * m.data[11]) + (this.data[3] * m.data[15]);

        const m4 = (this.data[4] * m.data[0]) + (this.data[5] * m.data[4]) + (this.data[6] * m.data[8]) + (this.data[7] * m.data[12]);
        const m5 = (this.data[4] * m.data[1]) + (this.data[5] * m.data[5]) + (this.data[6] * m.data[9]) + (this.data[7] * m.data[13]);
        const m6 = (this.data[4] * m.data[2]) + (this.data[5] * m.data[6]) + (this.data[6] * m.data[10]) + (this.data[7] * m.data[14]);
        const m7 = (this.data[4] * m.data[3]) + (this.data[5] * m.data[7]) + (this.data[6] * m.data[11]) + (this.data[7] * m.data[15]);

        const m8 = (this.data[8] * m.data[0]) + (this.data[9] * m.data[4]) + (this.data[10] * m.data[8]) + (this.data[11] * m.data[12]);
        const m9 = (this.data[8] * m.data[1]) + (this.data[9] * m.data[5]) + (this.data[10] * m.data[9]) + (this.data[11] * m.data[13]);
        const m10 = (this.data[8] * m.data[2]) + (this.data[9] * m.data[6]) + (this.data[10] * m.data[10]) + (this.data[11] * m.data[14]);
        const m11 = (this.data[8] * m.data[3]) + (this.data[9] * m.data[7]) + (this.data[10] * m.data[11]) + (this.data[11] * m.data[15]);

        const m12 = (this.data[12] * m.data[0]) + (this.data[13] * m.data[4]) + (this.data[14] * m.data[8]) + (this.data[15] * m.data[12]);
        const m13 = (this.data[12] * m.data[1]) + (this.data[13] * m.data[5]) + (this.data[14] * m.data[9]) + (this.data[15] * m.data[13]);
        const m14 = (this.data[12] * m.data[2]) + (this.data[13] * m.data[6]) + (this.data[14] * m.data[10]) + (this.data[15] * m.data[14]);
        const m15 = (this.data[12] * m.data[3]) + (this.data[13] * m.data[7]) + (this.data[14] * m.data[11]) + (this.data[15] * m.data[15]);

        return new Matrix4([
            m0, m1, m2, m3,
            m4, m5, m6, m7,
            m8, m9, m10, m11,
            m12, m13, m14, m15
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
        this.data[9] += m.data[9];
        this.data[10] += m.data[10];
        this.data[11] += m.data[11];
        this.data[12] += m.data[12];
        this.data[13] += m.data[13];
        this.data[14] += m.data[14];
        this.data[15] += m.data[15];
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
        this.data[9] -= m.data[9];
        this.data[10] -= m.data[10];
        this.data[11] -= m.data[11];
        this.data[12] -= m.data[12];
        this.data[13] -= m.data[13];
        this.data[14] -= m.data[14];
        this.data[15] -= m.data[15];
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
        this.data[9] *= k;
        this.data[10] *= k;
        this.data[11] *= k;
        this.data[12] *= k;
        this.data[13] *= k;
        this.data[14] *= k;
        this.data[15] *= k;
        return this;
    }

    public dotEq(m: this): this {
        const m0 = (this.data[0] * m.data[0]) + (this.data[1] * m.data[4]) + (this.data[2] * m.data[8]) + (this.data[3] * m.data[12]);
        const m1 = (this.data[0] * m.data[1]) + (this.data[1] * m.data[5]) + (this.data[2] * m.data[9]) + (this.data[3] * m.data[13]);
        const m2 = (this.data[0] * m.data[2]) + (this.data[1] * m.data[6]) + (this.data[2] * m.data[10]) + (this.data[3] * m.data[14]);
        const m3 = (this.data[0] * m.data[3]) + (this.data[1] * m.data[7]) + (this.data[2] * m.data[11]) + (this.data[3] * m.data[15]);

        const m4 = (this.data[4] * m.data[0]) + (this.data[5] * m.data[4]) + (this.data[6] * m.data[8]) + (this.data[7] * m.data[12]);
        const m5 = (this.data[4] * m.data[1]) + (this.data[5] * m.data[5]) + (this.data[6] * m.data[9]) + (this.data[7] * m.data[13]);
        const m6 = (this.data[4] * m.data[2]) + (this.data[5] * m.data[6]) + (this.data[6] * m.data[10]) + (this.data[7] * m.data[14]);
        const m7 = (this.data[4] * m.data[3]) + (this.data[5] * m.data[7]) + (this.data[6] * m.data[11]) + (this.data[7] * m.data[15]);

        const m8 = (this.data[8] * m.data[0]) + (this.data[9] * m.data[4]) + (this.data[10] * m.data[8]) + (this.data[11] * m.data[12]);
        const m9 = (this.data[8] * m.data[1]) + (this.data[9] * m.data[5]) + (this.data[10] * m.data[9]) + (this.data[11] * m.data[13]);
        const m10 = (this.data[8] * m.data[2]) + (this.data[9] * m.data[6]) + (this.data[10] * m.data[10]) + (this.data[11] * m.data[14]);
        const m11 = (this.data[8] * m.data[3]) + (this.data[9] * m.data[7]) + (this.data[10] * m.data[11]) + (this.data[11] * m.data[15]);

        const m12 = (this.data[12] * m.data[0]) + (this.data[13] * m.data[4]) + (this.data[14] * m.data[8]) + (this.data[15] * m.data[12]);
        const m13 = (this.data[12] * m.data[1]) + (this.data[13] * m.data[5]) + (this.data[14] * m.data[9]) + (this.data[15] * m.data[13]);
        const m14 = (this.data[12] * m.data[2]) + (this.data[13] * m.data[6]) + (this.data[14] * m.data[10]) + (this.data[15] * m.data[14]);
        const m15 = (this.data[12] * m.data[3]) + (this.data[13] * m.data[7]) + (this.data[14] * m.data[11]) + (this.data[15] * m.data[15]);

        this.data[0] = m0;
        this.data[1] = m1;
        this.data[2] = m2;
        this.data[3] = m3;
        this.data[4] = m4;
        this.data[5] = m5;
        this.data[6] = m6;
        this.data[7] = m7;
        this.data[8] = m8;
        this.data[9] = m9;
        this.data[10] = m10;
        this.data[11] = m11;
        this.data[12] = m12;
        this.data[13] = m13;
        this.data[14] = m14;
        this.data[15] = m15;

        return this;
    }
}
