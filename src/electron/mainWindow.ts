import { app, BrowserWindow } from 'electron';
import path from "path";
import EventEmitter from 'events';

const appName = "MEMENTO - Svelte, Electron, TypeScript";

const defaultSettings = {
  title:  "MEMENTO - Svelte, Electron, TypeScript",
  width: 854,
  height: 480
}

class Main {
  window!: BrowserWindow;
  settings: {[key: string]: any};
  onEvent: EventEmitter = new EventEmitter();

  constructor(settings: {[key: string]: any} | null = null) {
    this.settings = settings ? {...settings} : {...defaultSettings}

    app.on('ready', () => { 
      this.window = this.createWindow(); 
      this.onEvent.emit("window-created");
    });
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
  }

  createWindow() {
    let settings = {...this.settings}
    app.name = appName;
    let window = new BrowserWindow({
      ...settings,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, "preload.js")
      }
    });

    window.loadURL(path.join(__dirname, 'www', 'index.html'));
    window.once('ready-to-show', () => {
      window.show()
    });

    return window;
  }

  onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  onActivate() {
    if (!this.window) {
      this.createWindow();
    }
  }

}

export default Main;