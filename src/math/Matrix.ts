export class Matrix {
    public static readonly identity: Matrix = new Matrix([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    public data: Array<number>;

    constructor(data?: Array<number>) {
        this.data = data || [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    public add(m: this): this {
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

    public sub(m: this): this {
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

    public mul(k: number): this {
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

    public dot(m: this): this {
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

    public static createOrthoMatrix(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix {
        const xorth = 2 / (right - left);
        const yorth = 2 / (top - bottom);
        const zorth = -2 / (near - far);

        const tx = -(left + right) / (left - right);
        const ty = -(bottom + top) / (bottom - top);
        const tz = -(near + far) / (near - far);

        return new Matrix([
           xorth, 0    , 0    , 0,
           0    , yorth, 0    , 0,
           0    , 0    , zorth, 0,
           tx   , ty   , tz   , 1
       ]);
    }
}
