export class Color {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number
  ) {}

  toString(): string {
    return `Color(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  [Symbol.toStringTag](): string {
    return 'Color';
  }
}
