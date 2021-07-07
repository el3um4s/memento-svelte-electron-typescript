"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContextBridge = void 0;
const electron_1 = require("electron");
function generateContextBridge(listChannels) {
    let listAPI = {};
    listChannels.forEach(el => {
        const api = getContextBridge(el);
        const name = el.nameAPI;
        listAPI[name] = { ...api };
    });
    electron_1.contextBridge.exposeInMainWorld("api", {
        ...listAPI
    });
}
exports.generateContextBridge = generateContextBridge;
function getContextBridge(obj) {
    let { validSendChannel, validReceiveChannel } = { ...obj };
    return {
        send: (channel, data) => {
            // whitelist channels
            if (validSendChannel.includes(channel)) {
                electron_1.ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            if (validReceiveChannel.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                // @ts-ignore
                electron_1.ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    };
}
;
