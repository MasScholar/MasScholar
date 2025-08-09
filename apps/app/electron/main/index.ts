import { app } from 'electron'
import { restoreOrCreateWindow } from './windows/mainWindow'

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
  .then(restoreOrCreateWindow)
  .catch(e => console.error('Failed create window:', e))
