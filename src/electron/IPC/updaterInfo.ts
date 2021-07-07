import { BrowserWindow, IpcMain, app } from "electron";
import { AppUpdater, autoUpdater } from "electron-updater";

import { APIChannels, SendChannels } from "./General/channelsInterface";

const nameAPI = "updaterInfo";

// to Main
const validSendChannel: SendChannels = {
    "requestVersionNumber": requestVersionNumber,
    "checkForUpdate": checkForUpdate,
    "startDownloadUpdate": startDownloadUpdate,
    "quitAndInstall": quitAndInstall,
};

// from Main
const validReceiveChannel: string[] = [
    "getVersionNumber",
    "checkingForUpdate",
    "updateAvailable",
    "updateNotAvailable",
    "downloadProgress",
    "updateDownloaded",
];

export const channels: APIChannels = { nameAPI, validSendChannel, validReceiveChannel }

export function initIpcMain(ipcMain:IpcMain, mainWindow: BrowserWindow) {
    if (mainWindow) {
        Object.keys(validSendChannel).forEach(key => {
            ipcMain.on(key, async( event, message) => {
                validSendChannel[key](mainWindow, event, message);
            });
        });
    }
}

function requestVersionNumber(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    const version = app.getVersion();
    const result = {version};
    mainWindow.webContents.send("getVersionNumber", result);
}

function checkForUpdate(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdates();
}

function startDownloadUpdate(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    autoUpdater.downloadUpdate();
}

function quitAndInstall(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    autoUpdater.quitAndInstall();
}

export function initAutoUpdater(autoUpdater: AppUpdater, mainWindow: BrowserWindow) {
    autoUpdater.on('checking-for-update', () => {
        mainWindow.webContents.send("checkingForUpdate", null);
    });

    autoUpdater.on('error', (err) => { });

    autoUpdater.on("update-available", (info: any) => {
        mainWindow.webContents.send("updateAvailable", info);
    });

        
    autoUpdater.on('download-progress', (info: any) => {
        mainWindow.webContents.send("downloadProgress", info);
    });

    autoUpdater.on("update-downloaded", (info: any) => {
        mainWindow.webContents.send("updateDownloaded", info);
    });

    autoUpdater.on("update-not-available", (info: any) => {
        mainWindow.webContents.send("updateNotAvailable", info);
    });
}







  




