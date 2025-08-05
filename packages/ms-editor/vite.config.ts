import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'playground'),
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
    reportCompressedSize: false,
  },
})
