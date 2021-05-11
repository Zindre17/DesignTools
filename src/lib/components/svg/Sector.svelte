<script lang="ts">
    import { linear } from "svelte/easing";
    import { tweened } from "svelte/motion";

    import { getSectorPath } from "../../svg/sector";

    export let centerX = 0;
    export let centerY = 0;
    export let radius: number;
    export let startAngle: number;
    export let endAngle: number;
    export let thickness: number;
    export let color: string = "gray";
    export let isExpanded: boolean = false;

    const currentRadius = tweened(radius, { duration: 200, easing: linear });
    const currentThickness = tweened(thickness, {
        duration: 200,
        easing: linear,
    });

    $: d = getSectorPath(
        centerX,
        centerY,
        $currentRadius,
        startAngle,
        endAngle,
        $currentThickness
    );
    $: toggleExpand(isExpanded);

    function toggleExpand(expand: boolean) {
        isExpanded = expand;
        let extra = radius * 0.05;
        if (isExpanded) {
            currentRadius.set(radius + extra);
            currentThickness.set(thickness + 2 * extra);
        } else {
            currentRadius.set(radius, { duration: 1 });
            currentThickness.set(thickness, { duration: 1 });
        }
    }
</script>

<path on:click fill={color} stroke={isExpanded ? "black" : "none"} {d} />

<style>
    path {
        cursor: pointer;
    }
</style>
