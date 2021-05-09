<script lang="ts">
    import { linear } from "svelte/easing";
    import { tweened } from "svelte/motion";

    import { getSectorPath } from "./lib/svg/sector";

    export let centerX = 0;
    export let centerY = 0;
    export let radius: number;
    export let startAngle: number;
    export let endAngle: number;
    export let thickness: number;
    export let color: string;
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
        currentRadius.set(isExpanded ? radius + extra : radius);
        currentThickness.set(isExpanded ? thickness + 2 * extra : thickness);
    }
</script>

<path
    on:click
    fill={color ?? "#ff3e00"}
    stroke={$currentRadius !== radius ? "black" : "none"}
    {d}
/>

<style>
    path {
        cursor: pointer;
    }
</style>
