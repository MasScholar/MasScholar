import { app, BrowserWindow, ipcMain } from 'electron'
import { createLaunchWindow } from './windows/launchWindow'
import { createSettingWindow } from './windows/settingWindow'

/**
 * When app is ready
 */
ipcMain.on('open-settings-window', async () => {
  await createSettingWindow()
})

/**
 * When
 */
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') app.quit()
})

/**
 * Create app window when background process will be ready
 */
app.whenReady()
  .then(async () => {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

    if (window === undefined) {
      window = await createLaunchWindow()
    }

    if (window.isMinimized()) {
      window.restore()
    }

    window.focus()
  })
  .catch(e => console.error('Failed create window:', e))
