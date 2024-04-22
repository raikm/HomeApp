import Vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  // If our .vue files have a style, it will be compiled as a single `.css` file under /dist.
  plugins: [Vue()],

  build: {
    // Output compiled files to /dist.
    outDir: './dist',
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      // Name of the library.
      name: '@nevo/ui',
      // We are building for CJS and ESM, use a function to rename automatically files.
      // Example: my-component-library.esm.js
      fileName: (format) => `${'ui'}.${format}.js`
    },
    rollupOptions: {
      // Vue is provided by the parent project, don't compile Vue source-code inside our library.
      external: ['vue'],
      output: { globals: { vue: 'Vue' } }
    }
  }
})
