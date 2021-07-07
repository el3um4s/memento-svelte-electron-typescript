<script lang="ts">
    let version:string = "-";

    let checkingForUpdate:boolean = false;
    let updateAvailable:boolean = false;
    let updateNotAvailable:boolean = false;
    let downloading:boolean = false;
    let quitAndInstall:boolean = false;

    let downloadMessage:string = "";

    globalThis.api.updaterInfo.send("requestVersionNumber", null);

    globalThis.api.updaterInfo.receive("getVersionNumber", (data) => {
        version = data.version;
    });

    function check() {
        checkingForUpdate = true;
        globalThis.api.updaterInfo.send("checkForUpdate", {version});
    }

    globalThis.api.updaterInfo.receive("checkingForUpdate", (data) => {
        checkingForUpdate = true;
        console.log("checkingForUpdate");
    });

    globalThis.api.updaterInfo.receive("updateAvailable", (data) => {
        checkingForUpdate = false;
        updateAvailable = true;
        console.log(data);
    });
       
    globalThis.api.updaterInfo.receive("updateNotAvailable", (data) => {
        checkingForUpdate = false;
        updateAvailable = false;
        updateNotAvailable = true;
        console.log(data);
    });

    function startDownloadUpdate() {
        globalThis.api.updaterInfo.send("startDownloadUpdate", null);
        updateAvailable = false;
        downloading = true;
    }

    globalThis.api.updaterInfo.receive("downloadProgress", (data) => {
        downloading = true;
        updateAvailable = false;
        let log_message = "Download speed: " + data.bytesPerSecond;
        log_message = log_message + ' - Downloaded ' + data.percent + '%';
        log_message = log_message + ' (' + data.transferred + "/" + data.total + ')';
        // console.log(log_message);
        // console.log(data);
        downloadMessage = log_message;
    });

    globalThis.api.updaterInfo.receive("updateDownloaded", (data) => {
        downloading = false;
        updateAvailable = false;
        quitAndInstall = true;
        // console.log(data);
    });

    function install() {
        globalThis.api.updaterInfo.send("quitAndInstall", null);
        quitAndInstall = false;
    }
</script>

<div>
    App version <span class="version">{version}</span>.
</div>

<div>
    {#if !checkingForUpdate && !updateAvailable && !downloading && !quitAndInstall}
    <button on:click={check}>Check for Update</button>
    {/if}
    {#if checkingForUpdate}
        Checking for update...
    {/if}
    {#if updateAvailable}
        <button on:click={startDownloadUpdate}>Updates are available. Click to download.</button>
    {/if}
    {#if updateNotAvailable}
        Update not available
    {/if}
    {#if downloading}
        {downloadMessage}
    {/if}
    {#if quitAndInstall}
        <button on:click={install}>The updates are ready. Click to quit and install.</button>
    {/if}
</div>

<style>
    .version {
        color: #ff3e00;
    }
</style>