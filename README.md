# Vue Web Component Library

A Vue-based accessible design system with headless web components. This library provides accessible, customizable components that can be imported individually to optimize bundle size.

## Features

- 🧩 **Web Components**: Use anywhere, framework-agnostic
- ♿ **Accessible**: Built with accessibility in mind
- 🎨 **Customizable**: Style with CSS variables
- 📦 **Tree-shakable**: Import only what you need
- 🔧 **Headless**: Behavior and accessibility without opinionated styling
- 🧰 **TypeScript**: Full type support

## Installation

You can install individual components or the entire library:

```bash
# Install the entire library
npm install @vue-web-component-library/components

# Or install individual components
npm install @vue-web-component-library/button
npm install @vue-web-component-library/input
npm install @vue-web-component-library/icon
```

### Installing from GitHub Packages

The packages are also available on GitHub Packages. To use them:

1. Create or modify your `.npmrc` file in your project root:

```
@vue-web-component-library:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Set your GitHub token as an environment variable:

```bash
export GITHUB_TOKEN=your_github_token
```

3. Install the packages:

```bash
# Install the entire library
npm install @vue-web-component-library/components

# Or install individual components
npm install @vue-web-component-library/button
npm install @vue-web-component-library/input
npm install @vue-web-component-library/icon
```

## Usage

### Importing Components

You can import each component individually:

```js
// Import specific components
import '@vue-web-component-library/button';
import '@vue-web-component-library/input';
import '@vue-web-component-library/icon';

// Or import everything
import '@vue-web-component-library/components';
```

### Using in HTML

Once imported, you can use the components as HTML elements:

```html
<!-- Button component -->
<vwc-button size="md" variant="primary">Click me</vwc-button>

<!-- Input component -->
<vwc-input 
  label="Username" 
  placeholder="Enter your username"
  helper-text="Your username must be at least 4 characters"
></vwc-input>

<!-- Icon component -->
<vwc-icon name="star" size="md" color="#FFD700"></vwc-icon>
```

## Customizing with CSS Variables

All components can be customized using CSS variables:

```css
:root {
  /* Button customization */
  --vwc-button-primary-bg: #4f46e5;
  --vwc-button-primary-text: white;
  --vwc-button-radius: 8px;
  
  /* Input customization */
  --vwc-input-border: 2px solid #e5e7eb;
  --vwc-input-radius: 8px;
  --vwc-input-focus-border-color: #4f46e5;
  
  /* Icon customization */
  --vwc-icon-md-size: 1.75rem;
  --vwc-icon-color: #4f46e5;
}
```

## Components

### Button

A customizable button component with various sizes and variants.

```html
<vwc-button size="md" variant="primary">Click me</vwc-button>
<vwc-button size="lg" variant="outline" disabled>Disabled</vwc-button>
<vwc-button variant="ghost">
  <vwc-icon name="favorite" slot="before"></vwc-icon>
  With Icon
</vwc-button>
```

### Input

An accessible input component with label, helper text, and error handling.

```html
<vwc-input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  required
></vwc-input>

<vwc-input 
  label="Password" 
  type="password"
  error="Password must be at least 8 characters"
>
  <vwc-icon name="lock" slot="before"></vwc-icon>
</vwc-input>
```

### Icon

A component for displaying Google Material Icons.

```html
<vwc-icon name="home" size="md"></vwc-icon>
<vwc-icon name="settings" color="#4f46e5"></vwc-icon>
<vwc-icon name="refresh" spin></vwc-icon>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Publishing

This library is published to GitHub Packages using a GitHub Actions workflow. To publish a new version:

1. Create a new release on GitHub or
2. Manually trigger the "Publish Packages" workflow from the Actions tab, selecting the version increment (patch, minor, major)

### GitHub Actions Workflow

The publishing workflow:

1. Builds all packages
2. Runs tests
3. Increments versions (when manually triggered)
4. Publishes packages to GitHub Packages

## License
MIT