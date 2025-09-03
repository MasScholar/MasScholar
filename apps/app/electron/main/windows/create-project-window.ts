import { BrowserWindow } from 'electron'
import { join } from 'path'

export async function createCreateProjectWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    resizable: false,
    width: 1000,
    height: 600,
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.cjs'),
    },
  })

  /**
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show()
  })

  await browserWindow.loadURL('http://localhost:5173/#/create-project')
  return browserWindow
}

