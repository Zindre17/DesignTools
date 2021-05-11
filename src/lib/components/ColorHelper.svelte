<script lang="ts">
    import {
        allColorFormats,
        allModes,
        ColorFormat,
        getColors as getModeColors,
        HSL,
        Mode,
    } from "../color";
    import ColorCopy from "./ColorCopy.svelte";
    import SectorWheel from "./svg/SectorWheel.svelte";
    import { fade } from "svelte/transition";

    let mode = Mode.Complimentary;
    let colorFormat = ColorFormat.HEX;
    let colors: HSL[] = [];
    $: colors = colors.length !== 0 ? getModeColors(mode, colors[0]) : [];
</script>

<div class="container">
    <SectorWheel
        expanded={colors.map((c) => c.hue)}
        on:colorSelected={(e) => {
            colors = getModeColors(mode, e.detail);
        }}
        radius={200}
        size={500}
        sectorCount={360}
        thickness={40}
    />
    <div class="right">
        <h2>
            Color
            <span>helper</span>
        </h2>
        <div>
            <select bind:value={mode}>
                {#each allModes() as mode}
                    <option>{mode}</option>
                {/each}
            </select>
            <select bind:value={colorFormat}>
                {#each allColorFormats() as format}
                    <option>{format}</option>
                {/each}
            </select>
        </div>
        <div>
            {#if colors}
                <div class="colors" transition:fade>
                    {#each colors as color}
                        <div class="row">
                            <ColorCopy {color} format={colorFormat} />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
    }

    .right {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
    }

    h2 {
        font-size: 3em;
        color: var(--dark-header-color);
        font-weight: 100;
    }

    h2 span {
        font-weight: 400;
    }

    .row {
        display: flex;
        align-items: center;
        padding: 15px 0;
    }

    .colors {
        display: flex;
        flex-direction: column;
    }
</style>
