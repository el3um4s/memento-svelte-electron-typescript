<script lang="ts">
  import { TitleBar } from "@el3um4s/svelte-titlebar";
  export let title: string = "Title";

  let outerW = globalThis.outerWidth - 8;
  let isMaximized = outerW >= globalThis.screen.availWidth;

  $: {
    isMaximized = outerW >= globalThis.screen.availWidth;
  }

  function minimize() {
    globalThis.api.windowControls.send("minimize", null);
  }
  function maximize() {
    globalThis.api.windowControls.send("maximize", null);
  }
  function close() {
    globalThis.api.windowControls.send("close", null);
  }
  function unmaximize() {
    globalThis.api.windowControls.send("unmaximize", null);
  }
</script>

<svelte:window bind:outerWidth={outerW} />

<main>
  <TitleBar
    {title}
    {isMaximized}
    on:clickMinimize={minimize}
    on:clickUnmaximize={unmaximize}
    on:clickMaximize={maximize}
    on:clickClose={close}
  />
  <div class="page">
    <slot />
  </div>
</main>

<style lang="postcss">
  main {
    @apply w-full;
    --background-color: theme("colors.gray.50");
    --text-color: theme("colors.red.900");
  }
  .page {
    @apply p-5 overflow-y-auto w-full border border-red-900;
    height: calc(100% - theme("spacing.8"));
  }

  .page::-webkit-scrollbar {
    @apply w-4;
  }

  .page::-webkit-scrollbar-track {
    @apply border-2 border-solid;
    background-color: var(--background-color);
    border-color: var(--text-color);
  }
  .page::-webkit-scrollbar-thumb {
    background-color: var(--text-color);
  }
</style>
