import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { ElectronPlugins } from './plugins/vite.electron.dev'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElectronPlugins()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
