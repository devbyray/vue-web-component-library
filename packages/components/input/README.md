# Input Component

An accessible, customizable input component for Vue applications, built as a web component.

## Installation

```bash
npm install @devbyrayray/vue-wc-input
pnpm add @devbyrayray/vue-wc-input
yarn add @devbyrayray/vue-wc-input
```

## Usage

```html
<!-- Import the component -->
<script>
import '@devbyrayray/vue-wc-input';
</script>

<!-- Basic usage -->
<vwc-input label="Username" placeholder="Enter your username"></vwc-input>

<!-- With helper text -->
<vwc-input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  helper-text="We'll never share your email with anyone else."
></vwc-input>

<!-- With error message -->
<vwc-input 
  label="Password" 
  type="password" 
  error="Password must be at least 8 characters"
></vwc-input>

<!-- Required input -->
<vwc-input label="Full Name" required></vwc-input>

<!-- Different sizes -->
<vwc-input label="Small Input" size="sm"></vwc-input>
<vwc-input label="Medium Input" size="md"></vwc-input>
<vwc-input label="Large Input" size="lg"></vwc-input>

<!-- Disabled state -->
<vwc-input label="Disabled Input" disabled></vwc-input>

<!-- Using slots for custom elements -->
<vwc-input label="Search">
  <span slot="before">🔍</span>
  <button slot="after">Clear</button>
</vwc-input>
```

## Props

| Prop           | Type                       | Default    | Description                           |
|----------------|----------------------------|------------|---------------------------------------|
| `modelValue`   | `string`                   | `''`       | The input's value (v-model)           |
| `name`         | `string`                   | `undefined`| The input's name attribute            |
| `type`         | `string`                   | `'text'`   | The input's type attribute            |
| `placeholder`  | `string`                   | `undefined`| Placeholder text                      |
| `size`         | `'sm' \| 'md' \| 'lg'`     | `'md'`     | The size of the input                 |
| `label`        | `string`                   | `undefined`| Label text for the input              |
| `helperText`   | `string`                   | `undefined`| Helper text displayed below the input |
| `error`        | `string`                   | `undefined`| Error message (overrides helper text) |
| `required`     | `boolean`                  | `false`    | Whether the input is required         |
| `disabled`     | `boolean`                  | `false`    | Disables the input when true          |
| `id`           | `string`                   | `auto-generated` | ID for the input element        |

## Events

| Event                | Description                                       |
|----------------------|---------------------------------------------------|
| `update:modelValue`  | Emitted when the input value changes              |
| `focus`              | Emitted when the input receives focus             |
| `blur`               | Emitted when the input loses focus                |

## Slots

| Slot      | Description                                  |
|-----------|----------------------------------------------|
| `before`  | Content to place before the input in its container |
| `after`   | Content to place after the input in its container  |

## Customization

You can customize the appearance of the input by overriding CSS variables:

```css
:root {
  /* Base styles */
  --vwc-input-gap: 0.375rem;
  --vwc-input-font-family: system-ui, sans-serif;
  
  /* Label styles */
  --vwc-input-label-font-size: 0.875rem;
  --vwc-input-label-font-weight: 500;
  --vwc-input-label-color: #374151;
  --vwc-input-label-margin-bottom: 0.25rem;
  
  /* Required indicator */
  --vwc-input-required-color: #ef4444;
  --vwc-input-required-margin: 0.125rem;
  
  /* Input container */
  --vwc-input-border: 1px solid #d1d5db;
  --vwc-input-radius: 4px;
  --vwc-input-bg: white;
  --vwc-input-transition: all 0.2s ease-in-out;
  
  /* Focus state */
  --vwc-input-focus-border-color: #3b82f6;
  --vwc-input-focus-ring: 0 0 0 2px rgb(59 130 246 / 0.25);
  
  /* Error state */
  --vwc-input-error-border-color: #ef4444;
  --vwc-input-error-focus-ring: 0 0 0 2px rgb(239 68 68 / 0.25);
  --vwc-input-error-color: #ef4444;
  --vwc-input-error-font-size: 0.75rem;
  --vwc-input-error-margin-top: 0.25rem;
  
  /* Input field */
  --vwc-input-text-color: #1f2937;
  --vwc-input-placeholder-color: #9ca3af;
  
  /* Disabled state */
  --vwc-input-disabled-bg: #f3f4f6;
  --vwc-input-disabled-border-color: #d1d5db;
  --vwc-input-disabled-text-color: #6b7280;
  
  /* Helper text */
  --vwc-input-helper-color: #6b7280;
  --vwc-input-helper-font-size: 0.75rem;
  --vwc-input-helper-margin-top: 0.25rem;
  
  /* Size variants */
  --vwc-input-sm-height: 2rem;
  --vwc-input-sm-padding: 0.375rem 0.75rem;
  --vwc-input-sm-font-size: 0.875rem;
  
  --vwc-input-md-height: 2.5rem;
  --vwc-input-md-padding: 0.5rem 1rem;
  --vwc-input-md-font-size: 1rem;
  
  --vwc-input-lg-height: 3rem;
  --vwc-input-lg-padding: 0.625rem 1.25rem;
  --vwc-input-lg-font-size: 1.125rem;
}
```

## Accessibility

- Uses associated labels with proper for/id relationships
- Indicates required fields visually and with aria-required
- Communicates error states with aria-invalid
- Links error messages with aria-describedby
- Supports keyboard navigation