---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "VWC Library"
  text: "Vue-based accessible design system"
  actions:
    - theme: brand
      text: Get started with our components
      link: /docs/components

features:
  - title: Button component
    link: /docs/components/button
    details: A versatile button component with support for different styles, sizes, and states to enhance user interactions.

  - title: Input component
    link: /docs/components/input
    details: A customizable input field component designed for accessibility and seamless data entry.

  - title: Icon component
    link: /docs/components/icon
    details: A library of scalable and accessible icons to complement your design system.
---

<!-- Add a ComponentExample demonstration at the bottom of the homepage -->
<div class="component-demo">
  <h2>Try our Button component</h2>
  <ComponentExample
    title="Button Demo"
    code="<vwc-button variant='primary'>Click Me</vwc-button>"
    :editable="true">
    <vwc-button variant="primary">Click Me</vwc-button>
  </ComponentExample>
</div>

<style>
.component-demo {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
</style>
