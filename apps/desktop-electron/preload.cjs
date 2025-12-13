// apps/desktop-electron/preload.cjs
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('desktopApi', {
  ping: () => 'pong',
});
