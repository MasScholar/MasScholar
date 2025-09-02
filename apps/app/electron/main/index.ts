import { app, BrowserWindow } from 'electron'

import { useMiddleware } from "./framework";

import { createLaunchWindow } from './windows/launch-window'

import './handlers'

/**
 * When
 */
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') app.quit()
})

// 全局中间件示例
useMiddleware(async (ctx, next) => {
  console.log("[Middleware] Channel:", ctx.channel, "Args:", ctx.args);
  await next();
  if (ctx.result) console.log("[Middleware] Result:", ctx.result);
});

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
