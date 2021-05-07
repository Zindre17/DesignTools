<script lang="ts">
	import SectorWheel from "./SectorWheel.svelte";

	export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>

	<svg viewBox="0 0 500 500" height="400" width="400">
		<SectorWheel
			centerX={250}
			centerY={250}
			radius={200}
			thickness={20}
			sectorCount={12}
		/>
	</svg>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
