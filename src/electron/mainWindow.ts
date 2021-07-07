import { app, BrowserWindow, ipcMain } from 'electron';
import path from "path";

class Main {
  mainWindow!: BrowserWindow;

  constructor() {
    app.on('ready', async() => { 
      this.mainWindow = await this.createWindow();
      app.emit("main-window-ready");
    });
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
  }

  async createWindow() {
    app.name = `MEMENTO - Svelte, Electron, TypeScript`;
    let mainWindow = await new BrowserWindow({
      width: 854,
      height: 480,
      title: `MEMENTO - Svelte, Electron, TypeScript`,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, "preload.js")
      }
    });

    mainWindow.loadURL(path.join(__dirname, 'www', 'index.html'));

    return mainWindow;
  }

  onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

}

let mainWindow = new Main();

export default mainWindow;