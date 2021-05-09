<script lang="ts">
    import { HSL } from "./lib/color";
    import type { Color } from "./lib/color";
    import { createEventDispatcher, onMount } from "svelte";
    import Sector from "./Sector.svelte";

    type SectorConfig = {
        startAngle: number;
        endAngle: number;
        color: HSL;
    };

    export let sectorCount = 6;
    export let size: number;
    export let radius: number;
    export let thickness: number;

    const dispatch = createEventDispatcher<{ colorSelected: Color }>();

    let saturation = 100;
    let lightness = 50;

    $: width = size / 3;
    $: widthOffset = (size - width) / 2;

    $: offset = size / 2;

    $: edgeOffset = offset - radius + thickness;

    $: anglesPerSector = 360 / sectorCount;

    function createSectorConfigs(
        sectorCount: number,
        saturation: number,
        lightness: number
    ) {
        const sectorConfig: SectorConfig[] = [];
        for (let i = 0; i < sectorCount; i++) {
            let c = {} as SectorConfig;
            c.startAngle = i * anglesPerSector;
            c.endAngle = c.startAngle + anglesPerSector;
            c.color = new HSL(c.startAngle, saturation, lightness);
            sectorConfig.push(c);
        }
        return sectorConfig;
    }

    $: sectorConfig = createSectorConfigs(sectorCount, saturation, lightness);
    let selected = 0;
    $: selectedColor = sectorConfig[selected]?.color;
    $: dispatch("colorSelected", sectorConfig[selected]?.color);

    onMount(() => {
        dispatch("colorSelected", selectedColor);
    });
</script>

<div class="container">
    <svg viewBox="{-offset} {-offset} {size} {size}" height={size} width={size}>
        {#each sectorConfig as { startAngle, endAngle, color }, i}
            <Sector
                {radius}
                {thickness}
                {startAngle}
                {endAngle}
                isExpanded={selected === i}
                color={color.toString()}
                on:click={() => {
                    selected = i;
                }}
            />
        {/each}
    </svg>
    <div
        class="saturation"
        style="top:{edgeOffset}px;bottom:{offset}px;left:{widthOffset}px;"
    >
        <p>Saturation</p>
        <input
            type="range"
            min="0"
            max="100"
            bind:value={saturation}
            style="width:{width}px; background-image: linear-gradient(to right, hsl({selectedColor.hue}, 0%, {lightness}%), hsl({selectedColor.hue}, 50%, {lightness}%), hsl({selectedColor.hue}, 100%, {lightness}%))"
        />
    </div>
    <div style="top:{offset}px;bottom:{edgeOffset}px;left:{widthOffset}px;">
        <input
            type="range"
            min="0"
            max="100"
            bind:value={lightness}
            style="width:{width}px; background-image: linear-gradient(to right, hsl({selectedColor.hue}, {saturation}%, 0%), hsl({selectedColor.hue}, {saturation}%, 50%),hsl({selectedColor.hue}, {saturation}%, 100%))"
        />
        <p>Lightness</p>
    </div>
</div>

<style>
    .container {
        position: relative;
    }
    .container div {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        font-size: 18px;
    }
    input {
        cursor: pointer;
        pointer-events: all;
        margin: 0;
        appearance: none;
        -webkit-appearance: none;
        height: 20px;
        padding: 0;
        border-radius: 20px;
        border: none;
    }
    input::-moz-range-thumb,
    input::-webkit-slider-thumb {
        border-width: 1px;
        appearance: none;
        background-color: white;
    }
</style>
