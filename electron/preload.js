// Electron preload script
// Runs before the page loads and can expose safe APIs to the renderer process

import { contextBridge } from 'electron'

// Expose safe APIs to the renderer process if needed
// Example:
// contextBridge.exposeInMainWorld('electronAPI', {
//   // APIs exposed here
// })
