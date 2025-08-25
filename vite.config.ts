import type { TestOptions } from 'vitest'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

const config: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  } as TestOptions,
}

export default defineConfig(config)
