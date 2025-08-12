import { BrowserWindow } from 'electron'

export async function createMainWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    resizable: false,
    width: 1200,
    height: 600,
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      webviewTag: false,
    },
  })

  /**
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show()
  })

  await browserWindow.loadURL('http://localhost:5173/#/projects')
  return browserWindow
}

