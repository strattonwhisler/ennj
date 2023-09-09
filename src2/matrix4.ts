export class Matrix4 {
  static readonly IDENTITY = new Matrix4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );

  readonly #data: Float32Array;

  constructor(...data: Array<number> & { length: 16 }) {
    this.#data = new Float32Array(data);
  }
  
  valueOf(): Float32Array {
    return this.#data;
  }

  getIndex(index: number): number {
    if (index < 0 || index > 15) {
      throw new RangeError('Index out of range [0, 15]');
    }

    return this.#data[index];
  }

  getRowColumn(row: number, column: number): number {
    if (row < 0 || row > 3) {
      throw new RangeError('Row out of range [0, 3]');
    }
    
    if (column < 0 || column > 3) {
      throw new RangeError('Column out of range [0, 3]');
    }
    
    return this.#data[row * 4 + column];
  }

  setIndex(index: number, value: number): void {
    if (index < 0 || index > 15) {
      throw new RangeError('Index out of range [0, 15]');
    }

    this.#data[index] = value;
  }

  setRowColumn(row: number, column: number, value: number): void {
    if (row < 0 || row > 3) {
      throw new RangeError('Row out of range [0, 3]');
    }
    
    if (column < 0 || column > 3) {
      throw new RangeError('Column out of range [0, 3]');
    }
    
    this.#data[row * 4 + column] = value;
  }

  add(b: this): Matrix4 {
    return new Matrix4(
      this.#data[0] + b.#data[0],
      this.#data[1] + b.#data[1],
      this.#data[2] + b.#data[2],
      this.#data[3] + b.#data[3],
      this.#data[4] + b.#data[4],
      this.#data[5] + b.#data[5],
      this.#data[6] + b.#data[6],
      this.#data[7] + b.#data[7],
      this.#data[8] + b.#data[8],
      this.#data[9] + b.#data[9],
      this.#data[10] + b.#data[10],
      this.#data[11] + b.#data[11],
      this.#data[12] + b.#data[12],
      this.#data[13] + b.#data[13],
      this.#data[14] + b.#data[14],
      this.#data[15] + b.#data[15]
    );
  }

  sub(b: this): Matrix4 {
    return new Matrix4(
      this.#data[0] - b.#data[0],
      this.#data[1] - b.#data[1],
      this.#data[2] - b.#data[2],
      this.#data[3] - b.#data[3],
      this.#data[4] - b.#data[4],
      this.#data[5] - b.#data[5],
      this.#data[6] - b.#data[6],
      this.#data[7] - b.#data[7],
      this.#data[8] - b.#data[8],
      this.#data[9] - b.#data[9],
      this.#data[10] - b.#data[10],
      this.#data[11] - b.#data[11],
      this.#data[12] - b.#data[12],
      this.#data[13] - b.#data[13],
      this.#data[14] - b.#data[14],
      this.#data[15] - b.#data[15]
    );
  }

  mul(k: number): Matrix4 {
    return new Matrix4(
      this.#data[0] * k,
      this.#data[1] * k,
      this.#data[2] * k,
      this.#data[3] * k,
      this.#data[4] * k,
      this.#data[5] * k,
      this.#data[6] * k,
      this.#data[7] * k,
      this.#data[8] * k,
      this.#data[9] * k,
      this.#data[10] * k,
      this.#data[11] * k,
      this.#data[12] * k,
      this.#data[13] * k,
      this.#data[14] * k,
      this.#data[15] * k
    );
  }

  div(k: number): Matrix4 {
    return new Matrix4(
      this.#data[0] / k,
      this.#data[1] / k,
      this.#data[2] / k,
      this.#data[3] / k,
      this.#data[4] / k,
      this.#data[5] / k,
      this.#data[6] / k,
      this.#data[7] / k,
      this.#data[8] / k,
      this.#data[9] / k,
      this.#data[10] / k,
      this.#data[11] / k,
      this.#data[12] / k,
      this.#data[13] / k,
      this.#data[14] / k,
      this.#data[15] / k
    );
  }
  
  dot(b: this): Matrix4 {
    return new Matrix4(
    (this.#data[0] * b.#data[0]) + (this.#data[1] * b.#data[4]) + (this.#data[2] * b.#data[8]) + (this.#data[3] * b.#data[12]),
      (this.#data[0] * b.#data[1]) + (this.#data[1] * b.#data[5]) + (this.#data[2] * b.#data[9]) + (this.#data[3] * b.#data[13]),
      (this.#data[0] * b.#data[2]) + (this.#data[1] * b.#data[6]) + (this.#data[2] * b.#data[10]) + (this.#data[3] * b.#data[14]),
      (this.#data[0] * b.#data[3]) + (this.#data[1] * b.#data[7]) + (this.#data[2] * b.#data[11]) + (this.#data[3] * b.#data[15]),
      (this.#data[4] * b.#data[0]) + (this.#data[5] * b.#data[4]) + (this.#data[6] * b.#data[8]) + (this.#data[7] * b.#data[12]),
      (this.#data[4] * b.#data[1]) + (this.#data[5] * b.#data[5]) + (this.#data[6] * b.#data[9]) + (this.#data[7] * b.#data[13]),
      (this.#data[4] * b.#data[2]) + (this.#data[5] * b.#data[6]) + (this.#data[6] * b.#data[10]) + (this.#data[7] * b.#data[14]),
      (this.#data[4] * b.#data[3]) + (this.#data[5] * b.#data[7]) + (this.#data[6] * b.#data[11]) + (this.#data[7] * b.#data[15]),
      (this.#data[8] * b.#data[0]) + (this.#data[9] * b.#data[4]) + (this.#data[10] * b.#data[8]) + (this.#data[11] * b.#data[12]),
      (this.#data[8] * b.#data[1]) + (this.#data[9] * b.#data[5]) + (this.#data[10] * b.#data[9]) + (this.#data[11] * b.#data[13]),
      (this.#data[8] * b.#data[2]) + (this.#data[9] * b.#data[6]) + (this.#data[10] * b.#data[10]) + (this.#data[11] * b.#data[14]),
      (this.#data[8] * b.#data[3]) + (this.#data[9] * b.#data[7]) + (this.#data[10] * b.#data[11]) + (this.#data[11] * b.#data[15]),
      (this.#data[12] * b.#data[0]) + (this.#data[13] * b.#data[4]) + (this.#data[14] * b.#data[8]) + (this.#data[15] * b.#data[12]),
      (this.#data[12] * b.#data[1]) + (this.#data[13] * b.#data[5]) + (this.#data[14] * b.#data[9]) + (this.#data[15] * b.#data[13]),
      (this.#data[12] * b.#data[2]) + (this.#data[13] * b.#data[6]) + (this.#data[14] * b.#data[10]) + (this.#data[15] * b.#data[14]),
      (this.#data[12] * b.#data[3]) + (this.#data[13] * b.#data[7]) + (this.#data[14] * b.#data[11]) + (this.#data[15] * b.#data[15])
    );
  }

  addEq(b: this): Matrix4 {
    this.#data[0] += b.#data[0];
    this.#data[1] += b.#data[1];
    this.#data[2] += b.#data[2];
    this.#data[3] += b.#data[3];
    this.#data[4] += b.#data[4];
    this.#data[5] += b.#data[5];
    this.#data[6] += b.#data[6];
    this.#data[7] += b.#data[7];
    this.#data[8] += b.#data[8];
    this.#data[9] += b.#data[9];
    this.#data[10] += b.#data[10];
    this.#data[11] += b.#data[11];
    this.#data[12] += b.#data[12];
    this.#data[13] += b.#data[13];
    this.#data[14] += b.#data[14];
    this.#data[15] += b.#data[15];
    return this;
  }

  subEq(b: this): Matrix4 {
    this.#data[0] -= b.#data[0];
    this.#data[1] -= b.#data[1];
    this.#data[2] -= b.#data[2];
    this.#data[3] -= b.#data[3];
    this.#data[4] -= b.#data[4];
    this.#data[5] -= b.#data[5];
    this.#data[6] -= b.#data[6];
    this.#data[7] -= b.#data[7];
    this.#data[8] -= b.#data[8];
    this.#data[9] -= b.#data[9];
    this.#data[10] -= b.#data[10];
    this.#data[11] -= b.#data[11];
    this.#data[12] -= b.#data[12];
    this.#data[13] -= b.#data[13];
    this.#data[14] -= b.#data[14];
    this.#data[15] -= b.#data[15];
    return this;
  }

  mulEq(k: number): Matrix4 {
    this.#data[0] *= k;
    this.#data[1] *= k;
    this.#data[2] *= k;
    this.#data[3] *= k;
    this.#data[4] *= k;
    this.#data[5] *= k;
    this.#data[6] *= k;
    this.#data[7] *= k;
    this.#data[8] *= k;
    this.#data[9] *= k;
    this.#data[10] *= k;
    this.#data[11] *= k;
    this.#data[12] *= k;
    this.#data[13] *= k;
    this.#data[14] *= k;
    this.#data[15] *= k;
    return this;
  }

  divEq(k: number): Matrix4 {
    this.#data[0] /= k;
    this.#data[1] /= k;
    this.#data[2] /= k;
    this.#data[3] /= k;
    this.#data[4] /= k;
    this.#data[5] /= k;
    this.#data[6] /= k;
    this.#data[7] /= k;
    this.#data[8] /= k;
    this.#data[9] /= k;
    this.#data[10] /= k;
    this.#data[11] /= k;
    this.#data[12] /= k;
    this.#data[13] /= k;
    this.#data[14] /= k;
    this.#data[15] /= k;
    return this;
  }

  dotEq(b: this): Matrix4 {
    const d0 = (this.#data[0] * b.#data[0]) + (this.#data[1] * b.#data[4]) + (this.#data[2] * b.#data[8]) + (this.#data[3] * b.#data[12]);
    const d1 = (this.#data[0] * b.#data[1]) + (this.#data[1] * b.#data[5]) + (this.#data[2] * b.#data[9]) + (this.#data[3] * b.#data[13]);
    const d2 = (this.#data[0] * b.#data[2]) + (this.#data[1] * b.#data[6]) + (this.#data[2] * b.#data[10]) + (this.#data[3] * b.#data[14]);
    const d3 = (this.#data[0] * b.#data[3]) + (this.#data[1] * b.#data[7]) + (this.#data[2] * b.#data[11]) + (this.#data[3] * b.#data[15]);
    const d4 = (this.#data[4] * b.#data[0]) + (this.#data[5] * b.#data[4]) + (this.#data[6] * b.#data[8]) + (this.#data[7] * b.#data[12]);
    const d5 = (this.#data[4] * b.#data[1]) + (this.#data[5] * b.#data[5]) + (this.#data[6] * b.#data[9]) + (this.#data[7] * b.#data[13]);
    const d6 = (this.#data[4] * b.#data[2]) + (this.#data[5] * b.#data[6]) + (this.#data[6] * b.#data[10]) + (this.#data[7] * b.#data[14]);
    const d7 = (this.#data[4] * b.#data[3]) + (this.#data[5] * b.#data[7]) + (this.#data[6] * b.#data[11]) + (this.#data[7] * b.#data[15]);
    const d8 = (this.#data[8] * b.#data[0]) + (this.#data[9] * b.#data[4]) + (this.#data[10] * b.#data[8]) + (this.#data[11] * b.#data[12]);
    const d9 = (this.#data[8] * b.#data[1]) + (this.#data[9] * b.#data[5]) + (this.#data[10] * b.#data[9]) + (this.#data[11] * b.#data[13]);
    const d10 = (this.#data[8] * b.#data[2]) + (this.#data[9] * b.#data[6]) + (this.#data[10] * b.#data[10]) + (this.#data[11] * b.#data[14]);
    const d11 = (this.#data[8] * b.#data[3]) + (this.#data[9] * b.#data[7]) + (this.#data[10] * b.#data[11]) + (this.#data[11] * b.#data[15]);
    const d12 = (this.#data[12] * b.#data[0]) + (this.#data[13] * b.#data[4]) + (this.#data[14] * b.#data[8]) + (this.#data[15] * b.#data[12]);
    const d13 = (this.#data[12] * b.#data[1]) + (this.#data[13] * b.#data[5]) + (this.#data[14] * b.#data[9]) + (this.#data[15] * b.#data[13]);
    const d14 = (this.#data[12] * b.#data[2]) + (this.#data[13] * b.#data[6]) + (this.#data[14] * b.#data[10]) + (this.#data[15] * b.#data[14]);
    const d15 = (this.#data[12] * b.#data[3]) + (this.#data[13] * b.#data[7]) + (this.#data[14] * b.#data[11]) + (this.#data[15] * b.#data[15]);
    return new Matrix4(
      d0, d1, d2, d3,
      d4, d5, d6, d7,
      d8, d9, d10, d11,
      d12, d13, d14, d15
    );
  }

  //TODO: Transposed
  //TODO: TransposeEq
  //TODO: Inverted
  //TODO: InverseEq

  toString(): string {
    return `Matrix4(${this.#data.toString()})`;
  }

  [Symbol.toStringTag](): string {
    return "Matrix4";
  }
}
