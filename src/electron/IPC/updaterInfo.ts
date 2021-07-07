import { APIChannels } from "./General/channelsInterface";

const nameAPI = "updaterInfo";

// to Main
const validSendChannel: string[] = [
    "requestVersionNumber",
    "checkForUpdate",
    "startDownloadUpdate",
    "quitAndInstall"
];

// from Main
const validReceiveChannel: string[] = [
    "getVersionNumber",
    "checkingForUpdate",
    "updateAvailable",
    "updateNotAvailable",
    "downloadProgress",
    "updateDownloaded"
];

export const channels: APIChannels = {
    nameAPI, validSendChannel, validReceiveChannel
}