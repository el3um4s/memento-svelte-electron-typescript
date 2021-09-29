import { SendChannels } from "./General/channelsInterface";
import IPC from "./General/IPC";
import { BrowserWindow } from "electron";

const nameAPI = "windowControls";

// to main
const validSendChannel: SendChannels = {
    "minimize": minimize,
    "maximize": maximize,
    "unmaximize": unmaximize,
    "close": close
};

// from Main
const validReceiveChannel: string[] = [
    
];

const windowControls = new IPC ({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});

export default windowControls;

// Enter here the functions for ElectronJS

function minimize(customWindow: BrowserWindow, event: Electron.IpcMainEvent, message: string) {
    customWindow.minimize();
}

function maximize(customWindow: BrowserWindow, event: Electron.IpcMainEvent, message: string) {
    customWindow.maximize();
}

function close(customWindow: BrowserWindow, event: Electron.IpcMainEvent, message: string) {
    customWindow.destroy();
}

function unmaximize(customWindow: BrowserWindow, event: Electron.IpcMainEvent, message: string) {
    customWindow.unmaximize()
}
