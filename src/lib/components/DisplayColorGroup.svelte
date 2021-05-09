<script lang="ts">
    import { fade } from "svelte/transition";
    import {
        allColorFormats,
        allModes,
        Color,
        ColorFormat,
        complementaryHsl,
        HSL,
        Mode,
    } from "../color";
    import ColorCopy from "./ColorCopy.svelte";
    import ColorDisplay from "./ColorDisplay.svelte";

    export let color: Color;

    let mode: Mode;
    let modes = allModes();

    let format = ColorFormat.HEX;
    let formats = allColorFormats();

    function getColors(mode: Mode, color: Color) {
        let colors = [];
        if (color) colors.push(color);
        switch (mode) {
            case Mode.Complimentary:
                if (color?.isHSL()) colors.push(complementaryHsl(color));
                break;
            case Mode.Monochromatic:
                if (color?.isHSL()) {
                    let { hue, saturation, lightness } = color;
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
                }
                break;
            case Mode.Analogous:
                if (color?.isHSL()) {
                    const offsetDegrees = 360 / 12;
                    const { hue, saturation, lightness } = color;
                    colors.push(
                        new HSL(hue + offsetDegrees, saturation, lightness)
                    );
                    colors.push(
                        new HSL(hue + offsetDegrees * 2, saturation, lightness)
                    );
                }
                break;
            case Mode.Triadic:
                if (color?.isHSL()) {
                    const { hue, saturation, lightness } = color;
                    const offset = 360 / 3;
                    colors.push(new HSL(hue + offset, saturation, lightness));
                    colors.push(
                        new HSL(hue + offset * 2, saturation, lightness)
                    );
                }
                break;
            case Mode.Tetradic:
                if (color?.isHSL()) {
                    const { hue, saturation, lightness } = color;
                    const offset = 360 / 4;
                    colors.push(new HSL(hue + offset, saturation, lightness));
                    colors.push(
                        new HSL(hue + offset * 2, saturation, lightness)
                    );
                    colors.push(
                        new HSL(hue + offset * 3, saturation, lightness)
                    );
                }
                break;
            default:
                break;
        }
        return colors;
    }
    $: colors = getColors(mode, color);
</script>

<div>
    <select bind:value={mode}>
        {#each modes as mode}
            <option>{mode}</option>
        {/each}
    </select>
    <select bind:value={format}>
        {#each formats as format}
            <option>{format}</option>
        {/each}
    </select>

    {#if color}
        <div class="container" transition:fade>
            {#each colors as color}
                <ColorDisplay {color} />
                <ColorCopy {color} {format} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: auto auto;
        text-align: left;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
    }
</style>
