import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: [
            'packages/ui/**/*.test.{ts,tsx}',
          ],
          environment: 'jsdom',
        },
      },
    ],
  },
})
