"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const events_1 = __importDefault(require("events"));
const appName = "MEMENTO - Svelte, Electron, TypeScript";
const defaultSettings = {
    title: "MEMENTO - Svelte, Electron, TypeScript",
    width: 854,
    height: 480
};
class Main {
    constructor(settings = null) {
        this.onEvent = new events_1.default();
        this.settings = settings ? { ...settings } : { ...defaultSettings };
        electron_1.app.on('ready', () => {
            this.window = this.createWindow();
            this.onEvent.emit("window-created");
        });
        electron_1.app.on('window-all-closed', this.onWindowAllClosed);
        electron_1.app.on('activate', this.onActivate);
    }
    createWindow() {
        let settings = { ...this.settings };
        electron_1.app.name = appName;
        let window = new electron_1.BrowserWindow({
            ...settings,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path_1.default.join(__dirname, "preload.js")
            }
        });
        window.loadURL(path_1.default.join(__dirname, 'www', 'index.html'));
        window.once('ready-to-show', () => {
            window.show();
        });
        return window;
    }
    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    }
    onActivate() {
        if (!this.window) {
            this.createWindow();
        }
    }
}
exports.default = Main;
