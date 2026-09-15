const { contextBridge, ipcRenderer } = require('electron');

// Exponemos una API segura al frontend
contextBridge.exposeInMainWorld('electronAPI', {
    // Esta función invoca el canal 'save-pdf' del main_2.js
    savePDF: (filename) => ipcRenderer.invoke('save-pdf', filename)
});
