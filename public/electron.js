const {app, BrowserWindow, globalShortcut} = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
        }
    })
    win.loadURL('http://localhost:3000')

    // Registrar o atalho de teclado (Ctrl+Shift+I)
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        win.webContents.openDevTools();
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})