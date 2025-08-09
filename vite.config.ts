// vite.config.ts (or vite.config.js if you prefer)
// ESM-safe: no __dirname by default, so we derive it.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ⚠️ If deploying a *project* site on GitHub Pages, set base to '/<repo-name>/'
// For a user/org site (valuablehope.github.io), keep it as '/'.
const base = '/'

export default defineConfig({
  base: '/BBS-landing-grand-lite/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      // Be explicit about the HTML entry so build never guesses wrong
      input: resolve(__dirname, 'index.html'),
    },
  },
})
