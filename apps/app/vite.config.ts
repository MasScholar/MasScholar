import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    VitePluginDoubleshot({
      type: 'electron',
      main: 'dist/main/index.cjs',
      entry: 'electron/main/index.ts',
      outDir: 'dist/main',
      external: ['electron'],
      electron: {
        build: {
          config: './electron-builder.config.js',
        },
        preload: {
          entry: 'electron/preload/index.ts',
          outDir: 'dist/preload',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
    reportCompressedSize: false,
  },
})
