import { BrowserWindow, IpcMain } from "electron";
import { APIChannels, SendChannels } from "./General/channelsInterface";

const nameAPI = "systemInfo";

// to Main
const validSendChannel: SendChannels = {
    "requestSystemInfo": requestSystemInfo
};

// from Main
const validReceiveChannel: string[] = [
    "getSystemInfo",
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

