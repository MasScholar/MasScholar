import { BrowserWindow } from 'electron'

async function createMainWindow() {
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

  await browserWindow.loadURL('http://localhost:5173')
  return browserWindow
}

export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined) {
    window = await createMainWindow()
  }

  if (window.isMinimized()) {
    window.restore()
  }

  window.focus()
}
