import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Web Component Library",
  description: "Vue-based accessible design system",
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
    }
  }
})
