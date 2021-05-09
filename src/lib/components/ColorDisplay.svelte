<script lang="ts">
    import type { Color } from "../color";

    export let color: Color;
    export let style: string;
</script>

<div class="container" {style}>
    <div class="color" style="background-color: {color.toString()}" />
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 5px;
    }
    .color {
        height: 50px;
        width: 50px;
        border-radius: 100%;
    }
</style>
