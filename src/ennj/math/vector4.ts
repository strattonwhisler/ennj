export class Vector4 {
    public static readonly Zero = new Vector4(0, 0, 0, 0);
    public static readonly Unit = new Vector4(1, 1, 1, 1);

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public add(v: this): Vector4 {
        return new Vector4(
            this.x += v.x,
            this.y += v.y,
            this.z += v.z,
            this.w += v.w
        );
    }

    public sub(v: this): Vector4 {
        return new Vector4(
            this.x -= v.x,
            this.y -= v.y,
            this.z -= v.z,
            this.w -= v.w
        );
    }

    public mul(k: number): Vector4 {
        return new Vector4(
            this.x *= k,
            this.y *= k,
            this.z *= k,
            this.w *= k
        );
    }

    public div(k: number): Vector4 {
        return new Vector4(
            this.x /= k,
            this.y /= k,
            this.z /= k,
            this.w /= k
        );
    }

    public addEq(v: this): this {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }

    public subEq(v: this): this {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }

    public mulEq(k: number): this {
        this.x *= k;
        this.y *= k;
        this.z *= k;
        this.w *= k;
        return this;
    }

    public divEq(k: number): this {
        this.x /= k;
        this.y /= k;
        this.z /= k;
        this.w /= k;
        return this;
    }

    public dot(v: this): number {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z)  + (this.w * v.w);
    }

    public normalized(): Vector4 {
        const l = this.length;
        return new Vector4(
            this.x / l,
            this.y / l,
            this.z / l,
            this.w / l
        );
    }

    public normalizeEq(): this {
        const l = this.length;
        this.x /= l;
        this.y /= l;
        this.z /= l;
        this.w /= l;
        return this;
    }

    public get length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
    }
}
