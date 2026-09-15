const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // Es CRÍTICO que esta ruta apunte exactamente a tu archivo preload
            preload: path.join(__dirname, 'preload_2.js')
        }
    });

    mainWindow.loadFile('index_2.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Este es el proceso que escucha al botón del HTML
ipcMain.handle('save-pdf', async (event, defaultFilename) => {
    try {
        // 1. Abrir diálogo para que el usuario elija dónde guardar
        const { filePath } = await dialog.showSaveDialog(mainWindow, {
            title: 'Guardar Catálogo PDF',
            defaultPath: defaultFilename,
            filters: [{ name: 'PDF Documents', extensions: ['pdf'] }]
        });

        if (!filePath) {
            return { success: false, message: 'Operación cancelada por el usuario' };
        }

        // 2. Generar el PDF usando el motor nativo
        const pdfData = await mainWindow.webContents.printToPDF({
            printBackground: true, // Imprime los colores de fondo
            pageSize: 'A4',
            margins: { top: 0, bottom: 0, left: 0, right: 0 }
        });

        // 3. Escribir el archivo en el disco
        fs.writeFileSync(filePath, pdfData);
        return { success: true, filePath: filePath };

    } catch (error) {
        console.error('Error generando PDF:', error);
        return { success: false, message: error.message };
    }
});
