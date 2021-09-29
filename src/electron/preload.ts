import { generateContextBridge } from "./IPC/General/contextBridge"

import systemInfo from "./IPC/systemInfo";
import updaterInfo from './IPC/updaterInfo';
import windowControls from './IPC/windowControls'

generateContextBridge([systemInfo, updaterInfo, windowControls]);
