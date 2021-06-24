<script lang="ts">
    let version = "-";

    globalThis.api.send("requestVersionNumber", null);
    globalThis.api.receive("getVersionNumber", (data) => {
        version = data.version;
    });
</script>

<div>
    App version <span class="version">{version}</span>.
</div>

<style>
    .version {
        color: #ff3e00;
    }
</style>