import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

/**
 * Create a base Vite configuration for component packages
 * @param {Object} options Configuration options
 * @param {string} options.name Package name for library build
 * @param {string} options.entry Entry point path
 * @param {string[]} options.externals External dependencies
 * @returns {import('vite').UserConfig}
 */
export function createBaseConfig(options) {
  const { name, entry = 'src/index.ts', externals = ['vue'] } = options;

  // Add all vue-web-component-library packages to externals
  const allExternals = [
    ...externals,
    /@vue-web-component-library\/.*/
  ];

  return defineConfig({
    plugins: [
      vue({
        customElement: true, // Enable Vue custom elements mode
      }),
      dts({ 
        include: ['src/**/*.ts', 'src/**/*.vue'],
        outDir: 'dist/types',
      }),
    ],
    build: {
      lib: {
        entry: resolve(process.cwd(), entry),
        name,
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: allExternals,
        output: {
          exports: 'named', // Prevent warnings about mixed exports
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  });
}