export class Vector {
    constructor(public x: number = 0, public y: number = 0) {
    }

    public add(v: Vector): this {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public sub(v: Vector): this {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public mul(k: number): this {
        this.x *= k;
        this.y *= k;
        return this;
    }

    public div(k: number): this {
        this.x /= k;
        this.y /= k;
        return this;
    }

    public dot(v: Vector): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    public normalize(): this {
        var l = this.length;
        this.x /= l;
        this.y /= l;
        return this;
    }

    public get length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}
