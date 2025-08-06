import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      include: ['src/**/*.{vue,ts,tsx}'],
      outDir: ['dist/types'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/src/', '/'),
        content
      })
    })
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => {
        return `${format === 'es' ? 'esm' : 'cjs'}/[name].${format === 'es' ? 'mjs' : 'js'}`;
      },
      cssFileName: 'style'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
