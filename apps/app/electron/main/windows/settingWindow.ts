import { BrowserWindow } from 'electron'

export async function createSettingWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    resizable: false,
    minimizable: false,
    alwaysOnTop: true,
    width: 900,
    height: 500,
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

  await browserWindow.loadURL('http://localhost:5173/#/settings')
  return browserWindow
}

