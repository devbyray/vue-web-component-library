import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue({
      customElement: true, // Enable Vue custom elements mode
    }),
    dts({ include: ['src/**/*.ts', 'src/**/*.vue'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'input',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', /@vue-web-component-library\/*/],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});