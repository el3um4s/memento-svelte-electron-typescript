import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import { autoUpdater } from "electron-updater";
import path from "path";

require('electron-reload')(__dirname);

let mainWindow:BrowserWindow;
// let notification: Notification;

// autoUpdater.checkForUpdates();

const createWindow  = () => { 
    mainWindow = new BrowserWindow({
        width: 854,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "preload.js")
        }
    });
    mainWindow.loadURL(path.join(__dirname, 'www', 'index.html'));
}

app.on('ready', () => {
    app.name = 'Svelte Template';
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

ipcMain.on('requestSystemInfo', async (event, message) => {
    console.log(event);
    console.log(message);
    const versionChrome = process.versions.chrome;
    const versionNode = process.versions.node;
    const versionElectron = process.versions.electron;
    const result = {
        chrome: versionChrome,
        node: versionNode,
        electron: versionElectron
    }
    mainWindow.webContents.send("getSystemInfo", result);
});

ipcMain.on('requestVersionNumber', async (event, message) => {
    console.log(event);
    console.log(message);
    const version = app.getVersion();
    const result = {version}

    mainWindow.webContents.send("getVersionNumber", result);
});


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
    mainWindow.webContents.send("checkingForUpdate", null);
});
autoUpdater.on('error', (err) => {
    console.log(err);
});

autoUpdater.on("update-available", (info) => {
    console.log(info);
    mainWindow.webContents.send("updateAvailable", info);
});
  
autoUpdater.on("update-not-available", (info) => {
    console.log(info)
    mainWindow.webContents.send("updateNotAvailable", info);
})

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
    mainWindow.webContents.send("downloadProgress", progressObj);
})

autoUpdater.on("update-downloaded", (info) => {
    console.log(info);
    mainWindow.webContents.send("updateDownloaded", info);
});

