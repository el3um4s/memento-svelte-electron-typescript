<script lang="ts">
  let chrome = "-";
  let node = "-";
  let electron = "-";

  globalThis.api.systemInfo.send("requestSystemInfo", null);
  globalThis.api.systemInfo.receive("getSystemInfo", (data) => {
    chrome = data.chrome;
    node = data.node;
    electron = data.electron;
  });
</script>

<div>
  We are using Node.js <span class="version">{node}</span>, Chromium
  <span class="version">{chrome}</span>, and Electron
  <span class="version">{electron}</span>.
</div>

<style>
</style>
