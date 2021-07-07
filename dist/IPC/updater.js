"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channels = void 0;
// to Main
const validSendChannel = [
    "checkForUpdate",
    "startDownloadUpdate",
    "quitAndInstall"
];
// from Main
const validReceiveChannel = [
    "checkingForUpdate",
    "updateAvailable",
    "updateNotAvailable",
    "downloadProgress",
    "updateDownloaded"
];
exports.channels = {
    validSendChannel, validReceiveChannel
};
