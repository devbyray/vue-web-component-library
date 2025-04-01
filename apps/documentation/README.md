# Vue Web Component Library Documentation

This is the documentation app for the Vue Web Component Library. It uses VitePress to generate a static site with documentation for all the components in the library.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm (preferred)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

To run the documentation site locally:

```bash
# Start development server
pnpm dev
```

This will:
1. Run the copy-readme script to gather all README files
2. Start the VitePress development server
3. Open `http://localhost:5173` in your browser (or similar port)

### Building for Production

```bash
# Build the static site
pnpm build

# Preview the built site
pnpm preview
```

## The copy-readme.js Script

The `copy-readme.js` script plays a crucial role in our documentation process. It does the following:

- Copies README.md files from all packages to the documentation public directory
- Copies component-specific README files to maintain component documentation
- Updates image paths in markdown files to work correctly in the browser
- Copies image assets to the public directory
- Ensures all documentation is up-to-date each time the site is built

This script runs automatically when you run `pnpm dev` or `pnpm build`.

### How It Works

1. The script first cleans the target directories
2. It then copies all markdown files from the source directories:
   - `/packages/components`
   - `/docs`
3. It processes image paths in markdown files to use absolute paths
4. It copies the root README.md file
5. It specifically handles component READMEs to ensure they're properly included
6. It copies all image assets used in documentation

### Customizing

If you need to add new source directories to be processed, you can modify the `directories` array in the `copyReadmeFiles` function.

## Component Documentation

Our documentation imports markdown files using the `MarkdownImporter.vue` component, which:

- Fetches and renders markdown content
- Applies syntax highlighting to code blocks
- Formats tables and other markdown elements

For full documentation visit the [VitePress documentation](https://vitepress.dev/).