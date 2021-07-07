export interface APIContextBridge {
    send: (channel: string, data: any) => void;
    receive: (channel: string, func: (arg0: any) => void) => void;
}

export interface APIChannels {
    nameAPI: string,
    validSendChannel: SendChannels,
    validReceiveChannel: string[]
}

export interface SendChannels {
    [key: string]: Function
}