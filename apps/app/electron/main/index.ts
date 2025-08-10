import { app, BrowserWindow, ipcMain } from 'electron'
import { createLaunchWindow } from './windows/launchWindow'
import { createSettingWindow } from './windows/settingWindow'
import { createMainWindow } from './windows/mainWindow'
import { createCreateProjectWindow } from './windows/createProjectWindow'
/**
 * open window
 */
ipcMain.on('open-settings-window', async () => {
  await createSettingWindow()
})

ipcMain.on('open-create-window', async () => {
  await createCreateProjectWindow()
})

ipcMain.on('open-main-window', async () => {
  await createMainWindow()
})

ipcMain.on('open-launch-window', async () => {
  await createLaunchWindow()
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
