"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IPC_1 = __importDefault(require("./General/IPC"));
const nameAPI = "systemInfo";
// to Main
const validSendChannel = {
    "requestSystemInfo": requestSystemInfo
};
// from Main
const validReceiveChannel = [
    "getSystemInfo",
];
const systemInfo = new IPC_1.default({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});
exports.default = systemInfo;
// Enter here the functions for ElectronJS
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
