<script lang="ts">
  import IconMinimize from "./Icons/IconMinimize.svelte";
  import IconMaximize from "./Icons/IconMaximize.svelte";
  import IconUnmaximize from "./Icons/IconUnmaximize.svelte";
  import IconClose from "./Icons/IconClose.svelte";

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

<header>
  <div class="drag-region">
    <div class="window-title">
      <span>{title}</span>
    </div>
    <div class="window-controls">
      <div class="button" on:click={minimize}>
        <IconMinimize />
      </div>
      {#if isMaximized}
        <div class="button" on:click={unmaximize}>
          <IconUnmaximize />
        </div>
      {:else}
        <div class="button" on:click={maximize}>
          <IconMaximize />
        </div>
      {/if}
      <div class="button" on:click={close}>
        <IconClose />
      </div>
    </div>
  </div>
</header>

<main>
  <slot />
</main>

<style lang="postcss">
  header {
    @apply block fixed w-full h-8 p-1 bg-gray-50 text-red-900 font-bold;
  }

  main {
    @apply mt-8 p-5 overflow-y-auto w-full border border-red-900;
    height: calc(100% - theme("spacing.8"));
  }

  .drag-region {
    @apply w-full h-full;
    grid-template-columns: auto 138px;
    -webkit-app-region: drag;
  }

  .window-controls {
    @apply grid grid-cols-3 absolute top-0 right-2 h-full gap-2 select-none;
    -webkit-app-region: no-drag;
  }

  .button {
    @apply row-span-1 flex justify-center items-center w-full h-full;
  }

  .button:hover {
    @apply bg-red-600;
  }

  .window-title {
    @apply flex items-center left-2 overflow-hidden font-sans text-base;
  }

  .window-title span {
    @apply overflow-hidden overflow-ellipsis whitespace-nowrap leading-6;
  }

  main::-webkit-scrollbar {
    @apply w-4;
  }

  main::-webkit-scrollbar-track {
    @apply bg-red-900;
  }

  main::-webkit-scrollbar-thumb {
    @apply bg-red-500 border-2 border-red-900 border-solid;
  }

  main::-webkit-scrollbar-thumb:hover {
    @apply bg-red-300;
  }
</style>
