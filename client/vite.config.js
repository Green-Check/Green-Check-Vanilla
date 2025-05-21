import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
   server: {
    host: '0.0.0.0',     // allow LAN IP access
    port: 5173,
  }
})
