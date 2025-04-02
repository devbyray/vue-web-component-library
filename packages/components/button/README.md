# Button Component

An accessible, customizable button component for Vue applications, built as a web component.

[Find the latest version on GitHub](https://github.com/devbyray/vue-web-component-library/pkgs/npm/vue-wc-button)
## Installation

```bash
npm install @devbyray/vue-wc-button
pnpm add @devbyray/vue-wc-button
yarn add @devbyray/vue-wc-button
```

## Usage

```html
<!-- Import the component -->
<script>
import '@devbyray/vue-wc-button';
</script>

<!-- Basic usage -->
<vwc-button @click="() => console.log('Click')">Click me</vwc-button>

<!-- With variants -->
<vwc-button variant="primary">Primary Button</vwc-button>
<vwc-button variant="secondary">Secondary Button</vwc-button>
<vwc-button variant="outline">Outline Button</vwc-button>
<vwc-button variant="ghost">Ghost Button</vwc-button>

<!-- With sizes -->
<vwc-button size="sm">Small Button</vwc-button>
<vwc-button size="md">Medium Button</vwc-button>
<vwc-button size="lg">Large Button</vwc-button>

<!-- Disabled state -->
<vwc-button disabled>Disabled Button</vwc-button>

<!-- Using slots for complex content -->
<vwc-button>
  <span slot="before">🔍</span>
  Search
  <span slot="after">→</span>
</vwc-button>
```

## Props

| Prop      | Type                                | Default    | Description                    |
|-----------|-------------------------------------|------------|--------------------------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | The visual style of the button |
| `size`    | `'sm' \| 'md' \| 'lg'`              | `'md'`     | The size of the button         |
| `type`    | `'button' \| 'submit' \| 'reset'`   | `'button'` | The button type attribute      |
| `disabled`| `boolean`                           | `false`    | Disables the button when true  |
| `id`      | `string`                            | `undefined`| Optional ID for the button     |

## Events

| Event   | Description                                 |
|---------|---------------------------------------------|
| `click` | Emitted when the button is clicked          |

## Slots

| Slot      | Description                            |
|-----------|----------------------------------------|
| (default) | The button text or content             |
| `before`  | Content to place before the main text  |
| `after`   | Content to place after the main text   |

## Customization

You can customize the appearance of the button by overriding CSS variables:

```css
:root {
  /* Base styles */
  --vwc-button-gap: 0.75rem;
  --vwc-button-font-family: system-ui, sans-serif;
  --vwc-button-font-weight: 500;
  --vwc-button-radius: 4px;
  --vwc-button-border: 1px solid transparent;
  --vwc-button-transition: all 0.2s ease-in-out;
  --vwc-button-focus-outline: 2px solid currentColor;
  --vwc-button-focus-outline-offset: 2px;
  --vwc-button-disabled-opacity: 0.5;

  /* Size variants */
  --vwc-button-sm-font-size: 0.875rem;
  --vwc-button-sm-padding: 0.375rem 0.75rem;
  --vwc-button-sm-height: 2rem;
  
  --vwc-button-md-font-size: 1rem;
  --vwc-button-md-padding: 0.5rem 1rem;
  --vwc-button-md-height: 2.5rem;
  
  --vwc-button-lg-font-size: 1.125rem;
  --vwc-button-lg-padding: 0.625rem 1.25rem;
  --vwc-button-lg-height: 3rem;

  /* Primary variant */
  --vwc-button-primary-bg: #3b82f6;
  --vwc-button-primary-text: white;
  --vwc-button-primary-hover-bg: #2563eb;

  /* Secondary variant */
  --vwc-button-secondary-bg: #9ca3af;
  --vwc-button-secondary-text: white;
  --vwc-button-secondary-hover-bg: #6b7280;

  /* Outline variant */
  --vwc-button-outline-bg: transparent;
  --vwc-button-outline-text: #3b82f6;
  --vwc-button-outline-border: currentColor;
  --vwc-button-outline-hover-bg: rgb(59 130 246 / 0.1);

  /* Ghost variant */
  --vwc-button-ghost-bg: transparent;
  --vwc-button-ghost-text: #3b82f6;
  --vwc-button-ghost-border: transparent;
  --vwc-button-ghost-hover-bg: rgb(59 130 246 / 0.1);
}
```

## Accessibility

- Uses native `<button>` element
- Maintains proper focus states
- Uses `aria-disabled` for disabled state
- Ensures proper color contrast for text/background