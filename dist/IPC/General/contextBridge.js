"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContextBridge = void 0;
const electron_1 = require("electron");
function generateContextBridge(listIPC) {
    let listChannels = [];
    listIPC.forEach(el => {
        listChannels.push(el.channels);
    });
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
    const { validReceiveChannel } = { ...obj };
    const validSendChannel = getArrayOfValidSendChannel(obj);
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
                electron_1.ipcRenderer.on(channel, (event, ...args) => { func(...args); });
            }
        }
    };
}
;
function getArrayOfValidSendChannel(obj) {
    const { validSendChannel } = { ...obj };
    let result = Object.keys(validSendChannel);
    return result;
}
