import { app, BrowserWindow, ipcMain } from 'electron';
import path from "path";
import EventEmitter from 'events';
import IPC from './IPC/General/IPC';

const appName = "MEMENTO - Svelte, Electron, TypeScript";

const defaultSettings = {
  title:  "MEMENTO - Svelte, Electron, TypeScript",
  width: 854,
  height: 480,
  frame: false,
  backgroundColor: '#FFF'
}

class CustomWindow {
  window!: BrowserWindow;
  settings: {[key: string]: any};
  onEvent: EventEmitter = new EventEmitter();

  constructor(settings: {[key: string]: any} | null = null) {
    this.settings = settings ? {...defaultSettings, ...settings} : {...defaultSettings}
  }

  createWindow(url: string) {
    let settings = {...this.settings}
    app.name = appName;
    let window = new BrowserWindow({
      ...settings,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        nativeWindowOpen: true,
        preload: path.join(__dirname, "preload.js")
      }
    });

    window.loadURL(url);
    window.once('ready-to-show', () => {
      window.show()
    });

    this.window = window;
    return window;
  }

  async setIpcMain(api: Array<IPC>) {
    api.forEach( async (el) => await el.initIpcMain(ipcMain, this.window));
  }
}

export default CustomWindow;