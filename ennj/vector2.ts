
export class Vector2 {
  static readonly ZERO = new Vector2(0, 0);
  static readonly UNIT = new Vector2(1, 1);

  constructor(
    public x: number = 0,
    public y: number = 0
  ) {
  }

  add(b: this): Vector2 {
    return new Vector2(this.x + b.x, this.y + b.y);
  }

  sub(b: this): Vector2 {
    return new Vector2(this.x - b.x, this.y - b.y);
  }

  mul(k: number): Vector2 {
    return new Vector2(this.x * k, this.y * k);
  }

  div(k: number): Vector2 {
    return new Vector2(this.x / k, this.y / k);
  }

  addEq(b: this): this {
    this.x += b.x;
    this.y += b.y;
    return this;
  }

  subEq(b: this): this {
    this.x -= b.x;
    this.y -= b.y;
    return this;
  }

  mulEq(k: number): this {
    this.x *= k;
    this.y *= k;
    return this;
  }

  divEq(k: number): this {
    this.x /= k;
    this.y /= k;
    return this;
  }

  dot(b: this): number {
    return this.x * b.x + this.y * b.y;
  }

  normalized(): Vector2 {
    return this.div(this.length);
  }

  normalizedEq(): Vector2 {
    return this.divEq(this.length);
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  equals(b: this): boolean {
    // TODO: Epsilon
    return this.x === b.x && this.y === b.y;
  }

  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }

  [Symbol.toStringTag](): string {
    return 'Vector2';
  }
}
