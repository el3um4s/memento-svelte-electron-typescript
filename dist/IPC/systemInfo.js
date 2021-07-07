"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIpcMain = exports.channels = void 0;
const electron_1 = require("electron");
const nameAPI = "systemInfo";
// to Main
const validSendChannel = [
    "requestSystemInfo",
    "requestVersionNumber",
];
// from Main
const validReceiveChannel = [
    "getSystemInfo",
    "getVersionNumber",
];
exports.channels = {
    nameAPI, validSendChannel, validReceiveChannel
};
function initIpcMain(ipcMain, mainWindow) {
    if (mainWindow) {
        ipcMain.on("requestSystemInfo", async (event, message) => {
            requestSystemInfo(mainWindow, event, message);
        });
        ipcMain.on("requestVersionNumber", async (event, message) => {
            requestVersionNumber(mainWindow, event, message);
        });
    }
}
exports.initIpcMain = initIpcMain;
function requestSystemInfo(mainWindow, event, message) {
    const versionChrome = process.versions.chrome;
    const versionNode = process.versions.node;
    const versionElectron = process.versions.electron;
    const result = {
        chrome: versionChrome,
        node: versionNode,
        electron: versionElectron
    };
    mainWindow.webContents.send("getSystemInfo", result);
}
function requestVersionNumber(mainWindow, event, message) {
    const version = electron_1.app.getVersion();
    const result = { version };
    mainWindow.webContents.send("getVersionNumber", result);
}
