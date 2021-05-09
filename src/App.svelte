<script lang="ts">
	import type { Color } from "./lib/color";
	import DisplayColorGroup from "./lib/components/DisplayColorGroup.svelte";

	import SectorWheel from "./SectorWheel.svelte";

	export let name: string;
	let selectedColor: Color;
</script>

<main>
	<h1><span>Hello</span> {name}!</h1>
	<div class="container">
		<SectorWheel
			size={500}
			radius={200}
			thickness={40}
			sectorCount={360}
			on:colorSelected={(e) => (selectedColor = e.detail)}
		/>
		<div class="right">
			<h2>
				Color
				<span>helper</span>
			</h2>
			<DisplayColorGroup color={selectedColor} />
		</div>
	</div>
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
		font-size: 5em;
		font-weight: 100;
		margin-bottom: 150px;
	}

	h1 span {
		font-weight: bold;
		color: var(--dark-header-color);
	}

	h2 {
		font-size: 3em;
		color: var(--dark-header-color);
		font-weight: 100;
	}
	h2 span {
		font-weight: 400;
	}
	.container {
		display: flex;
		justify-content: center;
	}

	.right {
		display: flex;
		flex-direction: column;
		padding: 5px 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
