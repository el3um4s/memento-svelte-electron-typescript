import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import { autoUpdater } from "electron-updater";
import path from "path";

require('electron-reload')(__dirname);

let mainWindow:BrowserWindow;
let notification: Notification;

autoUpdater.checkForUpdates();

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


autoUpdater.on("update-available", () => {
    notification = new Notification({
        title: "Svelte App",
        body: "Updates are available. Click to download.",
        silent: true,

    });
    notification.show();
    notification.on("click", () => {
            autoUpdater.downloadUpdate();
    });
});
  
  
autoUpdater.on("update-downloaded", () => {
    notification = new Notification({
        title: "Svelte App",
        body: "The updates are ready. Click to quit and install.",
        silent: true,
    });
    notification.show();
    notification.on("click", () => {
        autoUpdater.quitAndInstall();
    });
});
