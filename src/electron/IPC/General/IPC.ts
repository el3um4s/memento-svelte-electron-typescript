import { toTryAsync } from "@el3um4s/to-try";

import { BrowserWindow, IpcMain } from "electron";
import { APIChannels, SendChannels } from "./channelsInterface";

export default class IPC {
    nameAPI: string = "api";
    validSendChannel: SendChannels = {};
    validReceiveChannel: string[] = [];

    constructor(channels: APIChannels) {
        this.nameAPI = channels.nameAPI;
        this.validSendChannel = channels.validSendChannel;
        this.validReceiveChannel = channels.validReceiveChannel;
    }

    get channels():APIChannels {
        return {
            nameAPI: this.nameAPI,
            validSendChannel: this.validSendChannel,
            validReceiveChannel: this.validReceiveChannel
        }
    }

    async initIpcMain(ipcMain:IpcMain, customWindow: BrowserWindow) {
        if (customWindow) {
            Object.keys(this.validSendChannel).forEach(key => {
                ipcMain.on(key, async ( event, message) => {
                    await toTryAsync(() => this.validSendChannel[key](customWindow, event, message), e => catchError(e));
                });
            });
        }
    }
}

const catchError = (e:any) =>  {if (e !instanceof TypeError) console.log(e)};