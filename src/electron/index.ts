import { app } from 'electron';
import { autoUpdater } from "electron-updater";
import path from "path";

import CustomWindow from "./customWindow";

import systemInfo from './IPC/systemInfo';
import updaterInfo from './IPC/updaterInfo';

require('electron-reload')(__dirname);

let mainWindow: CustomWindow;

app.on('ready', async () => {
    await createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

async function createMainWindow() {
    mainWindow = new CustomWindow();
    const urlPage = path.join(__dirname, 'www', 'index.html');
    mainWindow.createWindow(urlPage);
    
    await mainWindow.setIpcMain([systemInfo, updaterInfo]);

    updaterInfo.initAutoUpdater(autoUpdater, mainWindow.window);
}