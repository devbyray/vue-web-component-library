# Icon Component

An accessible, customizable icon component for Vue applications using Google Material Icons, built as a web component.

## Installation

```bash
npm install @devbyray/vue-wc-icon
pnpm add @devbyray/vue-wc-icon
yarn add @devbyray/vue-wc-icon
```

## Usage

```html
<!-- Import the component -->
<script>
import '@devbyray/vue-wc-icon';
</script>

<!-- Basic usage -->
<vwc-icon name="home"></vwc-icon>

<!-- With different sizes -->
<vwc-icon name="star" size="sm"></vwc-icon>
<vwc-icon name="star" size="md"></vwc-icon>
<vwc-icon name="star" size="lg"></vwc-icon>

<!-- With custom color -->
<vwc-icon name="favorite" color="#FF0000"></vwc-icon>

<!-- With animation -->
<vwc-icon name="refresh" spin></vwc-icon>

<!-- With accessibility label -->
<vwc-icon name="delete" label="Delete item"></vwc-icon>
```

## Available Icons

This component uses Google Material Icons. You can find all available icons in the [Material Icons Library](https://fonts.google.com/icons?selected=Material+Icons).

## Props

| Prop      | Type                     | Default    | Description                              |
|-----------|--------------------------|------------|------------------------------------------|
| `name`    | `string`                 | (required) | The name of the Material Icon            |
| `size`    | `'sm' \| 'md' \| 'lg'`   | `'md'`     | The size of the icon                     |
| `color`   | `string`                 | `currentColor` | The color of the icon (CSS color)    |
| `label`   | `string`                 | `undefined`| Accessibility label for screen readers   |
| `spin`    | `boolean`                | `false`    | Whether the icon should spin             |
| `disabled`| `boolean`                | `false`    | Visually disables the icon when true     |
| `id`      | `string`                 | `undefined`| Optional ID for the icon element         |

## Accessibility

- Uses appropriate `aria-*` attributes
- Hides decorative icons from screen readers with `aria-hidden="true"`
- Uses `role="img"` and `aria-label` when a label is provided

## Customization

You can customize the appearance of icons by overriding CSS variables:

```css
:root {
  /* Base styles */
  --vwc-icon-color: currentColor;
  --vwc-icon-size: auto;
  
  /* Size variants */
  --vwc-icon-sm-size: 1rem;
  --vwc-icon-md-size: 1.5rem;
  --vwc-icon-lg-size: 2rem;
  
  /* Animation */
  --vwc-icon-spin-duration: 2s;
}
```