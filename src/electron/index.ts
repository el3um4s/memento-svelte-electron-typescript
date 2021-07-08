import { ipcMain } from 'electron';
import { autoUpdater } from "electron-updater";
import Main from "./mainWindow";

import systemInfo from './IPC/systemInfo';
import updaterInfo from './IPC/updaterInfo';

require('electron-reload')(__dirname);

let main = new Main();

main.onEvent.on("window-created", ()=> {
    systemInfo.initIpcMain(ipcMain, main.window);
    updaterInfo.initIpcMain(ipcMain, main.window);

    updaterInfo.initAutoUpdater(autoUpdater, main.window);
});


