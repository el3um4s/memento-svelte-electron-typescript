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
  We are using Node.js <span class="version" data-testid="version-number-nodejs"
    >{node}</span
  >, Chromium
  <span class="version" data-testid="version-number-chrome">{chrome}</span>, and
  Electron
  <span class="version" data-testid="version-number-electron">{electron}</span>.
</div>

<style>
</style>
