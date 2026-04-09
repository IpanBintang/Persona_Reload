import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Persona_Reload/',
  root: 'src',          // ← add this
  build: {
    outDir: '../dist',  // ← and this, so dist stays at root
  },
})
