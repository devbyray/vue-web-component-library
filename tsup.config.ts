import { defineConfig } from 'tsup';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  esbuildPlugins: [
    {
      name: 'vue-loader',
      setup(build) {
        build.onLoad({ filter: /\.vue$/ }, async (args) => {
          const content = await readFile(args.path, 'utf8');
          const { compileTemplate, compileScript, parse } = await import('@vue/compiler-sfc');
          
          const { descriptor } = parse(content);
          
          let code = '';
          
          if (descriptor.script || descriptor.scriptSetup) {
            const scriptResult = compileScript(descriptor, {
              id: args.path,
              inlineTemplate: true,
            });
            
            code = scriptResult.content;
          }
          
          return {
            contents: code,
            loader: 'ts',
          };
        });
      },
    },
  ],
});