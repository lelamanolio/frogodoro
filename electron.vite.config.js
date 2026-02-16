import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, 'electron/main.js'),
      },
      // Copia la cartella resources nella directory di output
      copyPublicDir: true,
    },
    publicDir: resolve(__dirname, 'resources'),
  },
  preload: {
    build: {
      lib: {
        entry: resolve(__dirname, 'electron/preload.js'),
      },
    },
  },
  renderer: {
    root: '.',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
        },
      },
    },
    plugins: [vue(), vueDevTools()],
  },
})
