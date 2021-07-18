<script lang="ts">
	import Version from "./Components/Version.svelte";
	import InfoElectron from "./Components/InfoElectron.svelte";

	export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>
	<p>
		Visit the <a
			href="https://github.com/el3um4s/memento-svelte-electron-typescript"
			>Repository</a
		> to view the source code.
	</p>
	<Version />
	<InfoElectron />
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
