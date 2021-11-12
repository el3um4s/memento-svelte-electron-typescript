import { app } from 'electron';
import { autoUpdater } from "electron-updater";
import path from "path";

import CustomWindow from "./customWindow";

import systemInfo from './IPC/systemInfo';
import updaterInfo from './IPC/updaterInfo';
import windowControls from './IPC/windowControls';

require('electron-reload')(__dirname);

let mainWindow: CustomWindow;

// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendArgument('disable-gpu');

app.on('ready', async () => {
    await createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

async function createMainWindow() {
    const settings = {
        title: "MEMENTO - Svelte, Tailwind, Electron & TypeScript"
    };
    mainWindow = new CustomWindow(settings);   
    const urlPage = path.join(__dirname, 'www', 'index.html');
    mainWindow.createWindow(urlPage);
    
    await mainWindow.setIpcMain([systemInfo, updaterInfo, windowControls]);

    updaterInfo.initAutoUpdater(autoUpdater, mainWindow.window);
}