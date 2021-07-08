"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IPC {
    constructor(channels) {
        this.nameAPI = "api";
        this.validSendChannel = {};
        this.validReceiveChannel = [];
        this.nameAPI = channels.nameAPI;
        this.validSendChannel = channels.validSendChannel;
        this.validReceiveChannel = channels.validReceiveChannel;
    }
    get channels() {
        return {
            nameAPI: this.nameAPI,
            validSendChannel: this.validSendChannel,
            validReceiveChannel: this.validReceiveChannel
        };
    }
    initIpcMain(ipcMain, mainWindow) {
        if (mainWindow) {
            Object.keys(this.validSendChannel).forEach(key => {
                ipcMain.on(key, async (event, message) => {
                    this.validSendChannel[key](mainWindow, event, message);
                });
            });
        }
    }
}
exports.default = IPC;
