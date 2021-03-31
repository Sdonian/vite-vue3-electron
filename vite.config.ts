require('dotenv').config({ path: join(__dirname, '.env') })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path';
import externals from 'rollup-plugin-node-externals'

const root = join(__dirname, 'src/render');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: root,
  base: './',
  server: {
    port: +process.env.PORT
  },
  resolve: {
    alias: {
      '@': root,
      '@root': __dirname
    }
  },
  optimizeDeps: {
    exclude: ['electron-store', 'electron']
  },
  build: {
    outDir: join(__dirname, 'dist/render'),
    rollupOptions: {
      external: ['electron'],
      plugins: [
        externals(),
        // cjs2esm(),
      ],
    },
  }
})
