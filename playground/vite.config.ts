import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
// https://vite.dev/config/
const baseUrl = fileURLToPath(new URL('./', import.meta.url))
export default defineConfig({
  plugins: [
    vue(),
    vueRouter(),
    unocss(),
  ],
  resolve: {
    alias: [
      {
        find: 'antdv-next',
        replacement: path.resolve(baseUrl, '../packages/ui/src'),
      },
    ],
  },
})
