<script lang="ts">
	import ColorHelper from "./lib/components/ColorHelper.svelte";
	import Contrast from "./lib/components/Contrast.svelte";

	export let name: string;
</script>

<main>
	<h1><span>Hello</span> {name}!</h1>
	<ColorHelper />
	<Contrast />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 7em;
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
