import { app } from 'electron'
import { restoreOrCreateWindow } from './mainWindow'

/**
 * Create app window when background process will be ready
 */
app.whenReady()
  .then(restoreOrCreateWindow)
  .catch(e => console.error('Failed create window:', e))
