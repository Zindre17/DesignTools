
export enum Mode {
    Complimentary = "Complimentary",
    Monochromatic = "Monochromatic",
    Analogous = "Analogous",
    Triadic = "Triadic",
    Tetradic = "Tetradic",
}

export function allModes() {
    const all: Mode[] = [];
    for (const value of Object.keys(Mode))
        all.push(Mode[value]);
    return all;
}

export enum ColorFormat {
    HSL = "HSL",
    RGB = "RGB",
    HEX = "Hex",
}

export function allColorFormats() {
    const all: ColorFormat[] = [];
    for (const key of Object.keys(ColorFormat))
        all.push(ColorFormat[key]);
    return all;
}

export function getColors(mode: Mode, color: HSL) {
    const colors = [color];
    const { hue, saturation, lightness } = color;
    let offset: number;
    switch (mode) {
        case Mode.Complimentary:
            colors.push(complementaryHsl(color));
            break;
        case Mode.Monochromatic:
            let rangeLeft = 100 - lightness;
            let increment = rangeLeft / 3;
            colors.push(
                new HSL(
                    hue,
                    saturation,
                    Math.round(lightness + increment)
                )
            );
            colors.push(
                new HSL(
                    hue,
                    saturation,
                    Math.round(lightness + 2 * increment)
                )
            );
            break;
        case Mode.Analogous:
            const offsetDegrees = 360 / 12;
            colors.push(
                new HSL(hue + offsetDegrees, saturation, lightness)
            );
            colors.push(
                new HSL(hue + offsetDegrees * 2, saturation, lightness)
            );
            break;
        case Mode.Triadic:
            offset = 360 / 3;
            colors.push(new HSL(hue + offset, saturation, lightness));
            colors.push(
                new HSL(hue + offset * 2, saturation, lightness)
            );
            break;
        case Mode.Tetradic:
            offset = 360 / 4;
            colors.push(new HSL(hue + offset, saturation, lightness));
            colors.push(
                new HSL(hue + offset * 2, saturation, lightness)
            );
            colors.push(
                new HSL(hue + offset * 3, saturation, lightness)
            );
            break;
        default:
            break;
    }
    return colors;
}

export function convertToHsl(color: Color) {
    if (color.isHSL())
        return color;
    if (color.isHex())
        color = convertToRgb(color);
    if (color.isRGB()) {
        const _r = color.red / 255.0;
        const _g = color.green / 255.0;
        const _b = color.blue / 255.0;

        const Cmax = Math.max(_r, _g, _b);
        const Cmin = Math.min(_r, _g, _b);

        const delta = Cmax - Cmin;

        const L = (Cmax + Cmin) / 2;
        let H: number;
        if (delta === 0)
            H = 0;
        else if (Cmax == _r) {
            H = 60 * (((_g - _b) / delta) % 6);
        }
        else if (Cmax == _g) {
            H = 60 * (((_b - _r) / delta) + 2);
        }
        else {
            H = 60 * (((_r - _g) / delta) + 4);
        }
        let S: number;
        if (delta === 0) {
            S = 0;
        } else {
            S = delta / (1 - Math.abs(2 * L - 1));
        }
        return new HSL(H, S * 100, L * 100);
    }
}
export function convertToRgb(color: Color) {
    if (color.isHSL()) {
        const L = color.lightness / 100.0;
        const S = color.saturation / 100.0;
        const C = (1 - Math.abs(2 * L - 1)) * S;
        const X = C * (1 - Math.abs(((color.hue / 60.0) % 2) - 1));
        const m = L - C / 2.0;
        let _r: number, _g: number, _b: number;
        if (color.hue >= 300) {
            _r = C;
            _g = 0;
            _b = X;
        } else if (color.hue >= 240) {
            _r = X;
            _g = 0;
            _b = C;
        } else if (color.hue >= 180) {
            _r = 0;
            _g = X;
            _b = C;
        } else if (color.hue >= 120) {
            _r = 0;
            _g = C;
            _b = X;
        } else if (color.hue >= 60) {
            _r = X;
            _g = C;
            _b = 0;
        } else {
            _r = C;
            _g = X;
            _b = 0;
        }
        return new RGB((_r + m) * 255, (_g + m) * 255, (_b + m) * 255);
    }
    if (color.isHex()) {
        const r = parseInt(color.value.substring(0, 2));
        const g = parseInt(color.value.substring(2, 4));
        const b = parseInt(color.value.substring(4, 6));
        new RGB(r, g, b);
    }
    return color;
}

export function convertToHex(color: Color) {
    if (color.isHSL()) {
        color = convertToRgb(color);
    }
    if (color.isRGB()) {
        return new Hex(toHex(color.red) + toHex(color.green) + toHex(color.blue));
    }
    return color;
}

function toHex(number: number) {
    return number.toString(16).padStart(2, "0");
}

export function complementaryHsl({ hue, saturation, lightness: light }: HSL) {
    return new HSL(hue + 180, saturation, light);
}

export abstract class Color {
    isRGB(): this is RGB {
        return this instanceof RGB;
    }
    isHSL(): this is HSL {
        return this instanceof HSL;
    }
    isHex(): this is Hex {
        return this instanceof Hex;
    }
    abstract toString(): string;
}

export class Hex extends Color {
    readonly value: string

    constructor(value: string) {
        super();
        this.value = value;
    }
    toString() {
        return "#" + this.value;
    }
}

export class RGB extends Color {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        super();
        this.red = Math.round(red);
        this.green = Math.round(green);
        this.blue = Math.round(blue);
    }

    toString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}

export class HSL extends Color {
    readonly hue: number;
    readonly saturation: number;
    readonly lightness: number;

    constructor(hue: number, saturation: number, light: number) {
        super();
        this.hue = Math.round(Math.abs(hue) % 360);
        this.saturation = Math.round(Math.min(Math.max(saturation, 0), 100));
        this.lightness = Math.round(Math.min(Math.max(light, 0), 100));
    }
    toString() {
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
}