"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channels = void 0;
const nameAPI = "updaterInfo";
// to Main
const validSendChannel = [
    "requestVersionNumber",
    "checkForUpdate",
    "startDownloadUpdate",
    "quitAndInstall"
];
// from Main
const validReceiveChannel = [
    "getVersionNumber",
    "checkingForUpdate",
    "updateAvailable",
    "updateNotAvailable",
    "downloadProgress",
    "updateDownloaded"
];
exports.channels = {
    nameAPI, validSendChannel, validReceiveChannel
};
