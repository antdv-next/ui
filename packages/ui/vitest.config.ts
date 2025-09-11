import vue from '@vitejs/plugin-vue'
import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  plugins: [
    vue(),
  ],
})
