import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      'test-results',
      'coverage',
      'e2e',
    ]
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src')
    }
  }
}) 