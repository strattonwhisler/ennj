export class Matrix2 {
  static readonly IDENTITY = new Matrix2(
    1, 0,
    0, 1
  );

  readonly #data: Float32Array;

  constructor(...data: Array<number> & { length: 4 }) {
    this.#data = new Float32Array(data);
  }

  valueOf(): Float32Array {
    return this.#data;
  }

  getIndex(index: number): number {
    if (index < 0 || index > 3) {
      throw new RangeError('Index out of range [0, 3]');
    }

    return this.#data[index];
  }

  getRowColumn(row: number, column: number): number {
    if (row < 0 || row > 1) {
      throw new RangeError('Row out of range [0, 1]');
    }

    if (column < 0 || column > 1) {
      throw new RangeError('Column out of range [0, 1]');
    }

    return this.#data[row * 2 + column];
  }

  setIndex(index: number, value: number): void {
    if (index < 0 || index > 3) {
      throw new RangeError('Index out of range [0, 3]');
    }

    this.#data[index] = value;
  }

  setRowColumn(row: number, column: number, value: number): void {
    if (row < 0 || row > 1) {
      throw new RangeError('Row out of range [0, 1]');
    }

    if (column < 0 || column > 1) {
      throw new RangeError('Column out of range [0, 1]');
    }

    this.#data[row * 2 + column] = value;
  }

  add(b: this): Matrix2 {
    return new Matrix2(
      this.#data[0] + b.#data[0],
      this.#data[1] + b.#data[1],
      this.#data[2] + b.#data[2],
      this.#data[3] + b.#data[3]
    );
  }

  sub(b: this): Matrix2 {
    return new Matrix2(
      this.#data[0] - b.#data[0],
      this.#data[1] - b.#data[1],
      this.#data[2] - b.#data[2],
      this.#data[3] - b.#data[3]
    );
  }

  mul(k: number): Matrix2 {
    return new Matrix2(
      this.#data[0] * k,
      this.#data[1] * k,
      this.#data[2] * k,
      this.#data[3] * k
    );
  }

  div(k: number): Matrix2 {
    return new Matrix2(
      this.#data[0] / k,
      this.#data[1] / k,
      this.#data[2] / k,
      this.#data[3] / k
    );
  }

  dot(b: this): Matrix2 {
    return new Matrix2(
      (this.#data[0] * b.#data[0]) + (this.#data[1] * b.#data[2]),
      (this.#data[0] * b.#data[1]) + (this.#data[1] * b.#data[3]),
      (this.#data[2] * b.#data[0]) + (this.#data[3] * b.#data[2]),
      (this.#data[2] * b.#data[1]) + (this.#data[3] * b.#data[3])
    );
  }

  addEq(b: this): this {
    this.#data[0] += b.#data[0];
    this.#data[1] += b.#data[1];
    this.#data[2] += b.#data[2];
    this.#data[3] += b.#data[3];
    return this;
  }

  subEq(b: this): this {
    this.#data[0] -= b.#data[0];
    this.#data[1] -= b.#data[1];
    this.#data[2] -= b.#data[2];
    this.#data[3] -= b.#data[3];
    return this;
  }

  mulEq(k: number): this {
    this.#data[0] *= k;
    this.#data[1] *= k;
    this.#data[2] *= k;
    this.#data[3] *= k;
    return this;
  }

  divEq(k: number): this {
    this.#data[0] /= k;
    this.#data[1] /= k;
    this.#data[2] /= k;
    this.#data[3] /= k;
    return this;
  }

  dotEq(b: this): this {
    const d0 = (this.#data[0] * b.#data[0]) + (this.#data[1] * b.#data[2]);
    const d1 = (this.#data[0] * b.#data[1]) + (this.#data[1] * b.#data[3]);
    const d2 = (this.#data[2] * b.#data[0]) + (this.#data[3] * b.#data[2]);
    const d3 = (this.#data[2] * b.#data[1]) + (this.#data[3] * b.#data[3]);
    this.#data[0] = d0;
    this.#data[1] = d1;
    this.#data[2] = d2;
    this.#data[3] = d3;
    return this;
  }

  //TODO: Transposed
  //TODO: TransposeEq
  //TODO: Inverted
  //TODO: InverseEq

  toString(): string {
    return `Matrix2(${this.#data.toString()})`;
  }

  [Symbol.toStringTag](): string {
    return "Matrix2";
  }
}
