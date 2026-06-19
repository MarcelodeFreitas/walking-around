import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set GITHUB_PAGES=true when deploying to GitHub Pages.
// Update the base path to match your repository name.
const isGhPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  base: isGhPages ? '/walking-around/' : '/',
})
