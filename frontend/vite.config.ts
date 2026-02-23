import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Se estiver na Vercel, o base é '/', se for GitHub Pages, é '/gamekis/'
  base: process.env.VERCEL ? '/' : '/gamekis/',
})
