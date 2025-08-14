export type SetupOptions = {
  ipcDir?: string
  generatedTypesPath?: string
  log?: boolean
  middlewares?: Array<(channel: string, params: unknown) => Promise<unknown>>
  watch?: boolean
};

export async function setupElectronIpc(opts: SetupOptions = {}) {
  const ipcDir = opts.ipcDir
  // const outputTypesPath = opts.generatedTypesPath

  try {
    // generate ipc handler types
  } catch (e) {
    console.error('[IPC] generate types failed', e)
  }

  const ungister = loadIpcHandlers(ipcDir, { log: opts.log, middlewares: opts.middlewares })

  if (opts.watch) {

  }
}
