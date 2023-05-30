import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    // Relative to the root
    /* rollupOptions: {
        input: {
          main: resolve(__dirname, 'public/index.html')
        },
    }, */
    outDir: 'build',
  },
  publicDir: 'public',
  plugins: [
    createHtmlPlugin({
        inject: {
          data: {
            title: process.env.NODE_ENV === 'production' ? 'My site' : `My site [${env.toUpperCase()}]`,
          },
        },
    }),
    react()
  ],
  resolve: {
    alias: {
      'layouts': resolve(__dirname, './src/layouts'),
      'assets': resolve(__dirname, './src/assets'),
      'components': resolve(__dirname, './src/components'),
      'contexts': resolve(__dirname, './src/contexts'),
      'variables': resolve(__dirname, './src/variables'),
      'views': resolve(__dirname, './src/views'),
    },
  }
});