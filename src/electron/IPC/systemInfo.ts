import { BrowserWindow, app, IpcMain } from "electron";

import { APIChannels } from "./General/channelsInterface";

const nameAPI = "systemInfo";

// to Main
const validSendChannel: string[] = [
    "requestSystemInfo",
    "requestVersionNumber",
];

// from Main
const validReceiveChannel: string[] = [
    "getSystemInfo",
    "getVersionNumber",
];

export const channels: APIChannels = {
    nameAPI, validSendChannel, validReceiveChannel
}

export function initIpcMain(ipcMain:IpcMain, mainWindow: BrowserWindow) {
    if (mainWindow) {
        ipcMain.on("requestSystemInfo", async( event, message) => {
            requestSystemInfo(mainWindow, event, message)
        });

        ipcMain.on("requestVersionNumber", async( event, message) => {
            requestVersionNumber(mainWindow, event, message)
        });
    }

 
}

function requestSystemInfo(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    const versionChrome = process.versions.chrome;
    const versionNode = process.versions.node;
    const versionElectron = process.versions.electron;
    const result = {
        chrome: versionChrome,
        node: versionNode,
        electron: versionElectron
    }
    mainWindow.webContents.send("getSystemInfo", result);
}

function requestVersionNumber(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    const version = app.getVersion();
    const result = {version};
    mainWindow.webContents.send("getVersionNumber", result);
}
