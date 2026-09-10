const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 950,
    minWidth: 1100,
    minHeight: 700,
    show: true,
    title: 'Revolution Pro - Catálogo 2026',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.handle('save-pdf', async (event) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  try {
    // Esperamos a que la vista de impresión termine de renderizar.
    await new Promise(resolve => setTimeout(resolve, 300));

    const pdfData = await webContents.printToPDF({
      printBackground: true,
      margins: { marginType: 'none' },
      pageSize: 'Letter',
      landscape: false
    });

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: 'Guardar catálogo PDF',
      defaultPath: path.join(app.getPath('documents'), 'Catalogo_RevolutionPro_2026.pdf'),
      filters: [{ name: 'Documento PDF', extensions: ['pdf'] }]
    });

    if (canceled || !filePath) return { canceled: true };

    fs.writeFileSync(filePath, pdfData);
    return { canceled: false, filePath };
  } catch (error) {
    console.error('Error guardando PDF:', error);
    return { canceled: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
