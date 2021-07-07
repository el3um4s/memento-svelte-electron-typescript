"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIpcMain = exports.channels = void 0;
const nameAPI = "systemInfo";
// to Main
const validSendChannel = {
    "requestSystemInfo": requestSystemInfo
};
// from Main
const validReceiveChannel = [
    "getSystemInfo",
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
