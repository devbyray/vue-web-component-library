// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import MarkdownImporter from '../../components/MarkdownImporter.vue'
import ComponentExample from '../../components/ComponentExample.vue'
import './style.css'
import '@devbyray/vue-wc-components'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('MarkdownImporter', MarkdownImporter)
    app.component('ComponentExample', ComponentExample)

  }
}
