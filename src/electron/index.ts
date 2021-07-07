import { app, ipcMain } from 'electron';
import { autoUpdater } from "electron-updater";
import mainWindow from "./mainWindow";

import * as systemInfo from "./IPC/systemInfo";

require('electron-reload')(__dirname);

// https://blog.logrocket.com/electron-ipc-response-request-architecture-with-typescript/
// https://davembush.medium.com/typescript-and-electron-the-right-way-141c2e15e4e1

// @ts-ignore
app.on("main-window-ready", () => {
    systemInfo.initIpcMain(ipcMain, mainWindow.mainWindow);
})


ipcMain.on('checkForUpdate', async (event, message) => {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdates();
});

ipcMain.on('startDownloadUpdate', async (event, message) => {
    autoUpdater.downloadUpdate();
});

ipcMain.on('quitAndInstall', async (event, message) => {
    autoUpdater.quitAndInstall();
});


autoUpdater.on('checking-for-update', () => {
    mainWindow.mainWindow.webContents.send("checkingForUpdate", null);
});
autoUpdater.on('error', (err) => {
    // console.log(err);
});

autoUpdater.on("update-available", (info) => {
    // console.log(info);
    mainWindow.mainWindow.webContents.send("updateAvailable", info);
});
  
autoUpdater.on("update-not-available", (info) => {
    // console.log(info)
    mainWindow.mainWindow.webContents.send("updateNotAvailable", info);
})

autoUpdater.on('download-progress', (progressObj) => {
    // let log_message = "Download speed: " + progressObj.bytesPerSecond;
    // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    // console.log(log_message);
    mainWindow.mainWindow.webContents.send("downloadProgress", progressObj);
})

autoUpdater.on("update-downloaded", (info) => {
    // console.log(info);
    mainWindow.mainWindow.webContents.send("updateDownloaded", info);
});

