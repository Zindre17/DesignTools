<script lang="ts">
    import Sector from "./Sector.svelte";

    export let sectorCount = 6;
    export let centerX = 0;
    export let centerY = 0;
    export let radius: number;
    export let thickness: number;

    let anglesPerSector = 360 / sectorCount;
    let sectorConfig = [];
    for (let i = 0; i < sectorCount; i++) {
        let c = {} as any;
        c.startAngle = i * anglesPerSector;
        c.endAngle = c.startAngle + anglesPerSector;
        sectorConfig.push(c);
    }
</script>

{#each sectorConfig as config}
    <g transform="">
        <Sector
            {centerX}
            {centerY}
            {radius}
            {thickness}
            startAngle={config.startAngle}
            endAngle={config.endAngle}
            color="hsl({config.startAngle}, 100%, 50%)"
        />
    </g>
{/each}
