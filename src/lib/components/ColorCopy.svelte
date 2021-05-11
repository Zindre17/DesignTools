<script lang="ts">
    import { fade } from "svelte/transition";
    import { HSL, convertToHex, convertToHsl, convertToRgb } from "../color";
    import { ColorFormat } from "../color";

    export let color: HSL;
    export let format: ColorFormat;

    let colorElement: HTMLInputElement;
    let isCopied = false;
    let showText = false;

    const fadeConfig = { duration: 200 };

    function copyToClipboard() {
        colorElement.select();
        document.execCommand("copy");
        colorElement.blur();
        isCopied = true;
        setTimeout(() => (showText = false), 1000);
    }
    function getFormattedColor(color: HSL, format: ColorFormat) {
        switch (format) {
            case ColorFormat.RGB:
                if (color.isRGB()) return color;
                return convertToRgb(color);
            case ColorFormat.HEX:
                return convertToHex(color);
            default:
                return convertToHsl(color);
        }
    }
    $: formattedColor = getFormattedColor(color, format);
</script>

<div class="container">
    <div class="color" style="background-color:{color.toString()}" />
    <input
        bind:this={colorElement}
        readonly
        value={formattedColor.toString()}
    />
    {#if isCopied && showText}
        <p
            transition:fade|local={fadeConfig}
            on:outroend={() => {
                isCopied = false;
            }}
        >
            Copied
        </p>
    {/if}
    {#if !isCopied}
        <button
            transition:fade|local={fadeConfig}
            on:outroend={() => {
                showText = true;
            }}
            on:click={copyToClipboard}>Copy</button
        >
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 20px;
        height: 34px;
    }
    .color {
        height: 55px;
        width: 55px;
        border-radius: 100%;
        margin-right: -10px;
        z-index: 1;
    }
    input {
        font-family: "Fira Code", monospace;
        border-radius: 0;
        border: none;
        text-align: center;
        background-color: gainsboro;
        margin: 0;
        height: 100%;
        padding-left: 15px;
    }
    button {
        height: 100%;
        border-radius: 0;
        border: none;
        padding: 0 20px;
        margin: 0;
        margin-right: 20px;
        background-color: var(--medium-compliment-color);
    }
    button:hover {
        background-color: var(--soft-compliment-color);
    }
    p {
        padding: 0 20px;
    }
</style>
