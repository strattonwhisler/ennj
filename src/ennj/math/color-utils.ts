import { Color } from './color';


export function fromHsl(h: number, s: number, l: number, a: number): Color {
    let r: number, g: number, b: number;

    if(s === 0) {
        r = g = b = s;
    } else {
        let tr: number, tg: number, tb: number, t1: number, t2: number;

        if(l < 0.5) {
            t1 = l * (1 + s);
        } else {
            t1 = l + s - (l * s)
        }

        t2 = (2 * l) - t1;

        let th = h / 360;

        const pm1 = (value: number) => value < 0 ? value + 1 : value > 1 ? value - 1 : value;

        const third = 1 / 3;
        tr = pm1(th + third);
        tg = pm1(th);
        tb = pm1(th - third);

        const fixChannel = (c: number) => {
            if(6 * c < 1) {
                return t2 + (t1 - t2) * 6 * c;
            } else if(2 * c < 1) {
                return t1;
            } else if(3 * c < 2) {
                return t2 + (t1 - t2) * (0.666 - c) * 6;
            } else {
                return t2;
            }
        };

        r = fixChannel(tr);
        g = fixChannel(tg);
        b = fixChannel(tb);
    }

    return new Color(r, g, b, a);
}
