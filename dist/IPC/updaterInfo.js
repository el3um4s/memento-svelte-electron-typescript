"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const IPC_1 = __importDefault(require("./General/IPC"));
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
class UpdaterInfo extends IPC_1.default {
    initAutoUpdater(autoUpdater, mainWindow) {
        initAutoUpdater(autoUpdater, mainWindow);
    }
}
const updaterInfo = new UpdaterInfo({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});
exports.default = updaterInfo;
// Enter here the functions for ElectronJS
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
