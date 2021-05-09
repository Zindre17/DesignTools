<script lang="ts">
    import { fade } from "svelte/transition";
    import { Color, convertToHex, convertToHsl, convertToRgb } from "../color";
    import { ColorFormat } from "../color";

    export let color: Color;
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
    function getFormattedColor(color: Color, format: ColorFormat) {
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

<div>
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
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 20px;
        height: 34px;
    }
    input {
        font-family: "Fira Code", monospace;
        border-radius: 20px 0 0 20px;
        border: none;
        text-align: center;
        background-color: gainsboro;
        margin: 0;
        height: 100%;
    }
    button {
        height: 100%;
        border-radius: 0 20px 20px 0;
        border: none;
        padding: 0 20px;
        margin: 0;
        margin-right: 20px;
    }
    p {
        padding: 0 20px;
    }
</style>
