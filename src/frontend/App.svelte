<script lang="ts">
  import "./css/tailwind.pcss";
  import Version from "./Components/Version.svelte";
  import InfoElectron from "./Components/InfoElectron.svelte";
  import MainWithTitlebar from "./Components/MainWithTitlebar.svelte";

  export let name: string;
</script>

<svelte:head>
  <title>MEMENTO - Svelte, TailwindCSS, Electron and TypeScript</title>
</svelte:head>

<MainWithTitlebar title="MEMENTO - Svelte + Electron">
  <section class="text-center space-y-6">
    <h1>Hello {name}!</h1>
    <p>
      Visit the <a
        href="https://svelte.dev/tutorial"
        class="btn-orange hover:no-underline">Svelte tutorial</a
      > to learn how to build Svelte apps.
    </p>
    <p>
      Visit the <a
        href="https://github.com/el3um4s/memento-svelte-electron-typescript"
        class="btn-orange hover:no-underline">Repository</a
      > to view the source code.
    </p>
    <Version />
    <InfoElectron />
  </section>
</MainWithTitlebar>

<style>
  p {
    @apply m-1;
  }
</style>
