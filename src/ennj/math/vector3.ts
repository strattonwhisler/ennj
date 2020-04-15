export class Vector3 {
    public static readonly Zero = new Vector3(0, 0, 0);
    public static readonly Unit = new Vector3(1, 1, 1);

    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(v: this): Vector3 {
        return new Vector3(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        );
    }

    public sub(v: this): Vector3 {
        return new Vector3(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z
        );
    }

    public mul(k: number): Vector3 {
        return new Vector3(
            this.x * k,
            this.y * k,
            this.z * k
        );
    }

    public div(k: number): Vector3 {
        return new Vector3(
            this.x / k,
            this.y / k,
            this.z / k
        );
    }

    public addEq(v: this): this {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    public subEq(v: this): this {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    public mulEq(k: number): this {
        this.x *= k;
        this.y *= k;
        this.z *= k;
        return this;
    }

    public divEq(k: number): this {
        this.x /= k;
        this.y /= k;
        this.z /= k;
        return this;
    }

    public dot(v: this): number {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    }

    public normalized(): Vector3 {
        const l = this.length;
        return new Vector3(
            this.x / l,
            this.y / l,
            this.z / l
        );
    }

    public normalizeEq(): this {
        const l = this.length;
        this.x /= l;
        this.y /= l;
        this.z /= l;
        return this;
    }

    public get length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }
}
