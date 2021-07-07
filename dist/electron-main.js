"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
class Main {
    constructor() {
        electron_1.app.on('ready', () => { this.mainWindow = this.createWindow(); });
        electron_1.app.on('window-all-closed', this.onWindowAllClosed);
        electron_1.app.on('activate', this.onActivate);
        // this.registerIpcChannels(ipcChannels);
    }
    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    }
    onActivate() {
        if (!this.mainWindow) {
            this.createWindow();
        }
    }
    createWindow() {
        electron_1.app.name = `MEMENTO - Svelte, Electron, TypeScript`;
        let mainWindow = new electron_1.BrowserWindow({
            width: 854,
            height: 480,
            title: `MEMENTO - Svelte, Electron, TypeScript`,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path_1.default.join(__dirname, "preload.js")
            }
        });
        mainWindow.loadURL(path_1.default.join(__dirname, 'www', 'index.html'));
        return mainWindow;
    }
    registerIpcChannels(ipcChannels) {
        ipcChannels.forEach(channel => electron_1.ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
    }
}
let mainWindow = new Main();
exports.default = mainWindow;
