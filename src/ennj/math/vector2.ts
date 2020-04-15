export class Vector2 {
    public static readonly Zero = new Vector2(0, 0);
    public static readonly Unit = new Vector2(1, 1);

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(v: this): Vector2 {
        return new Vector2(
            this.x + v.x,
            this.y + v.y
        );
    }

    public sub(v: this): Vector2 {
        return new Vector2(
            this.x - v.x,
            this.y - v.y
        );
    }

    public mul(k: number): Vector2 {
        return new Vector2(
            this.x * k,
            this.y * k
        );
    }

    public div(k: number): Vector2 {
        return new Vector2(
            this.x / k,
            this.y / k
        );
    }

    public addEq(v: this): this {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public subEq(v: this): this {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public mulEq(k: number): this {
        this.x *= k;
        this.y *= k;
        return this;
    }

    public divEq(k: number): this {
        this.x /= k;
        this.y /= k;
        return this;
    }

    public dot(v: this): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    public normalized(): Vector2 {
        const l = this.length;
        return new Vector2(
            this.x / l,
            this.y / l
        );
    }

    public normalizeEq(): this {
        const l = this.length;
        this.x /= l;
        this.y /= l;
        return this;
    }

    public get length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}
