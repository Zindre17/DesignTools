import { chooseArcFlag, chooseSweepFlag, PathBuilder, polarToCartesian } from "./path";

export function getSectorPath(
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    thickness: number
) {
    // Sector is drawn from points 1 to 4
    //        ____
    //   2 ''     '' 1
    //    \        /
    //     3-'''-4

    let pathBuilder = new PathBuilder();

    // Move to 1
    let point = polarToCartesian(centerX, centerY, radius, startAngle);
    pathBuilder.moveTo(point);

    // Arc to 2
    point = polarToCartesian(centerX, centerY, radius, endAngle);
    pathBuilder.arcCircularTo(
        radius,
        chooseArcFlag(endAngle - startAngle),
        chooseSweepFlag(false),
        point
    );

    let innerRadius = radius - thickness;

    // Line to 3
    point = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    pathBuilder.lineTo(point);

    // Arc to 4
    point = polarToCartesian(centerX, centerY, innerRadius, startAngle);

    pathBuilder.arcCircularTo(
        innerRadius,
        chooseArcFlag(endAngle - startAngle),
        chooseSweepFlag(true),
        point
    );

    // close shape
    pathBuilder.close();
    return pathBuilder.toString();
}