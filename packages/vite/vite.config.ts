import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

/**
 * @param {import('vite').UserConfig} overrides
 */
export function defineBaseConfig(overrides) {
    const { name, entry = 'src/index.ts', externals = ['vue'] } = overrides;

    // Add all vue-web-component-library packages to externals
    const allExternals = [
        ...externals,
        /@devbyrayray\/vue-wc-.*/
    ];

    const config = {
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
    }

    return mergeConfig(config, overrides);
}