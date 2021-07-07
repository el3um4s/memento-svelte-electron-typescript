import { generateContextBridge } from "./IPC/General/contextBridge"

import * as systemInfo from "./IPC/systemInfo";
import * as updaterInfo from "./IPC/updaterInfo";

generateContextBridge([systemInfo.channels, updaterInfo.channels]);
