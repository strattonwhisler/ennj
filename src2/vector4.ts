export class Vector4 {
  static readonly ZERO = new Vector4(0, 0, 0, 0);
  static readonly UNIT = new Vector4(1, 1, 1, 1);

  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0,
    public w: number = 0
  ) {}

  add(b: this): Vector4 {
    return new Vector4(
      this.x + b.x,
      this.y + b.y,
      this.z + b.z,
      this.w + b.w
    );
  }

  sub(b: this): Vector4 {
    return new Vector4(
      this.x - b.x,
      this.y - b.y,
      this.z - b.z,
      this.w - b.w
    );
  }

  mul(k: number): Vector4 {
    return new Vector4(
      this.x * k,
      this.y * k,
      this.z * k,
      this.w * k
    );
  }

  div(k: number): Vector4 {
    return new Vector4(
      this.x / k,
      this.y / k,
      this.z / k,
      this.w / k
    );
  }

  addEq(b: this): this {
    this.x += b.x;
    this.y += b.y;
    this.z += b.z;
    this.w += b.w;
    return this;
  }

  subEq(b: this): this {
    this.x -= b.x;
    this.y -= b.y;
    this.z -= b.z;
    this.w -= b.w;
    return this;
  }

  mulEq(k: number): this {
    this.x *= k;
    this.y *= k;
    this.z *= k;
    this.w *= k;
    return this;
  }

  divEq(k: number): this {
    this.x /= k;
    this.y /= k;
    this.z /= k;
    this.w /= k;
    return this;
  }

  dot(b: this): number {
    return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
  }

  normalized(): Vector4 {
    return this.div(this.length);
  }

  normalizedEq(): Vector4 {
    return this.divEq(this.length);
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  get lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  equals(b: this): boolean {
    // TODO: Epsilon
    return this.x === b.x && this.y === b.y && this.z === b.z && this.w === b.w;
  }

  toString(): string {
    return `Vector4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }

  [Symbol.toStringTag](): string {
    return "Vector4";
  }
}
