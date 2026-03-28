import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.join(dirname, 'src'),
    },
  },
  test: {
    name: 'unit',
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
});
