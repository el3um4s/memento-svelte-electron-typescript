"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfoChannel = void 0;
const child_process_1 = require("child_process");
class SystemInfoChannel {
    getName() {
        return 'system-info';
    }
    handle(event, request) {
        if (!request.responseChannel) {
            request.responseChannel = `${this.getName()}_response`;
        }
        event.sender.send(request.responseChannel, { kernel: child_process_1.execSync('uname -a').toString() });
    }
}
exports.SystemInfoChannel = SystemInfoChannel;
