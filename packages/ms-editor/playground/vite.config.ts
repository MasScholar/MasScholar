import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './'),
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    vueDevTools(),
  ],
})
