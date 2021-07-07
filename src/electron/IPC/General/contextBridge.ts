import { contextBridge, ipcRenderer } from "electron";
import { APIContextBridge, APIChannels } from "./channelsInterface";

export function generateContextBridge(listChannels: APIChannels[]) {

  let listAPI: {[key: string]: APIContextBridge} = {};

  listChannels.forEach(el => {
    const api = getContextBridge(el);
    const name = el.nameAPI;
    listAPI[name] = {...api};
  });

  contextBridge.exposeInMainWorld("api", {
    ...listAPI
  });
}

function getContextBridge(obj: APIChannels): APIContextBridge {
  let { validSendChannel, validReceiveChannel } = { ...obj };
  return {
      send: (channel: string, data: any) => {
        // whitelist channels
        if (validSendChannel.includes(channel)) {
          ipcRenderer.send(channel, data);
        }
      },
      receive: (channel: string, func: (arg0: any) => void) => {
        if (validReceiveChannel.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          // @ts-ignore
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      }
  }
};