import { defineConfig } from 'vitepress'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Web Component Library",
  description: "Vue-based accessible design system",
  markdown: {
    ignoreDeadLinks: ['#file:README.md'],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Components',
        link: '/docs/components/',
      }
    ],

    sidebar: [
      {
        text: 'Components',
        link: '/docs/components/',
        items: [
          { text: 'Button', link: '/docs/components/button' },
          { text: 'Input', link: '/docs/components/input' },
          { text: 'Icon', link: '/docs/components/icon' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    optimizeDeps: {
      include: ['marked']
    },
    resolve: {
      alias: {
        // Point to the specific dist file rather than the directory
        '@devbyray/vue-wc-components': resolve(__dirname, '../../../packages/components/dist/index.js'),
        '@devbyray/vue-wc-components/dist/index.js': resolve(__dirname, '../../../packages/components/dist/index.js')
      }
    },
    build: {
      commonjsOptions: {
        strictRequires: true
      }
    }
  }
})
