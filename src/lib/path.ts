export class Point {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export type LargeArcFlag = 0 | 1;
export function chooseArcFlag(degreesToArc: number): LargeArcFlag {
    return degreesToArc > 180 ? 1 : 0;
}

export type SweepFlag = 0 | 1;
export function chooseSweepFlag(isClockwiseArc: boolean): SweepFlag {
    return isClockwiseArc ? 1 : 0;
}

export function polarToCartesian(
    centerX: number,
    centerY: number,
    r: number,
    angleInDegrees: number
): Point {
    var angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    new Point();

    return new Point(
        centerX + r * Math.cos(angleInRadians),
        centerY + r * -Math.sin(angleInRadians));
}

export class PathBuilder {
    operations = [];
    moveTo(point: Point) {
        this.operations.push(`M ${point.x} ${point.y}`);
    }
    lineTo(point: Point) {
        this.operations.push(`L ${point.x} ${point.y}`);
    }
    arcTo(radiusX: number, radiusY: number, xRotation: number, largeArc: LargeArcFlag, sweep: SweepFlag, point: Point) {
        this.operations.push(`A ${radiusX} ${radiusY} ${xRotation} ${largeArc} ${sweep} ${point.x} ${point.y}`);
    }
    arcCircularTo(radius: number, largeArc: LargeArcFlag, sweep: SweepFlag, point: Point) {
        this.arcTo(radius, radius, 0, largeArc, sweep, point);
    }
    close() {
        this.operations.push("Z");
    }
    toString() {
        return this.operations.join(" ");
    }
}

