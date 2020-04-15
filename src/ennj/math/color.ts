export class Color {
    public static readonly White = new Color(1.0, 1.0, 1.0, 1.0);
    public static readonly Red = new Color(1.0, 0.0, 0.0, 1.0);
    public static readonly Green = new Color(0.0, 1.0, 0.0, 1.0);
    public static readonly Blue = new Color(0.0, 0.0, 1.0, 1.0);
    public static readonly Black = new Color(0.0, 0.0, 0.0, 1.0);

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
