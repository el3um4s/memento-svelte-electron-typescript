"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAutoUpdater = exports.initIpcMain = exports.channels = void 0;
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const nameAPI = "updaterInfo";
// to Main
const validSendChannel = {
    "requestVersionNumber": requestVersionNumber,
    "checkForUpdate": checkForUpdate,
    "startDownloadUpdate": startDownloadUpdate,
    "quitAndInstall": quitAndInstall,
};
// from Main
const validReceiveChannel = [
    "getVersionNumber",
    "checkingForUpdate",
    "updateAvailable",
    "updateNotAvailable",
    "downloadProgress",
    "updateDownloaded",
];
exports.channels = { nameAPI, validSendChannel, validReceiveChannel };
function initIpcMain(ipcMain, mainWindow) {
    if (mainWindow) {
        Object.keys(validSendChannel).forEach(key => {
            ipcMain.on(key, async (event, message) => {
                validSendChannel[key](mainWindow, event, message);
            });
        });
    }
}
exports.initIpcMain = initIpcMain;
function requestVersionNumber(mainWindow, event, message) {
    const version = electron_1.app.getVersion();
    const result = { version };
    mainWindow.webContents.send("getVersionNumber", result);
}
function checkForUpdate(mainWindow, event, message) {
    electron_updater_1.autoUpdater.autoDownload = false;
    electron_updater_1.autoUpdater.checkForUpdates();
}
function startDownloadUpdate(mainWindow, event, message) {
    electron_updater_1.autoUpdater.downloadUpdate();
}
function quitAndInstall(mainWindow, event, message) {
    electron_updater_1.autoUpdater.quitAndInstall();
}
function initAutoUpdater(autoUpdater, mainWindow) {
    autoUpdater.on('checking-for-update', () => {
        mainWindow.webContents.send("checkingForUpdate", null);
    });
    autoUpdater.on('error', (err) => { });
    autoUpdater.on("update-available", (info) => {
        mainWindow.webContents.send("updateAvailable", info);
    });
    autoUpdater.on('download-progress', (info) => {
        mainWindow.webContents.send("downloadProgress", info);
    });
    autoUpdater.on("update-downloaded", (info) => {
        mainWindow.webContents.send("updateDownloaded", info);
    });
    autoUpdater.on("update-not-available", (info) => {
        mainWindow.webContents.send("updateNotAvailable", info);
    });
}
exports.initAutoUpdater = initAutoUpdater;
