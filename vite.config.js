import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: "/web_projekti/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
