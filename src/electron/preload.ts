import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

const validSendChannel: string[] = [
  "toMain",
  "requestSystemInfo",
  "requestVersionNumber",
  "checkForUpdate",
  "startDownloadUpdate",
  "quitAndInstall"
];
const validReceiveChannel: string[] = [
  "fromMain",
  "getSystemInfo",
  "getVersionNumber",
  "checkingForUpdate",
  "updateAvailable",
  "updateNotAvailable",
  "downloadProgress",
  "updateDownloaded"
];

contextBridge.exposeInMainWorld("api", {
  send: (channel: string, data: any) => {
    // whitelist channels
    if (validSendChannel.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: (arg0: any) => void) => {
    if (validReceiveChannel.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      // @ts-ignore
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
