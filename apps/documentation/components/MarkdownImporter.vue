<!-- filepath: /Users/byrayray/Documents/projects/devbyrayray/vue-web-component-library/apps/documentation/components/MarkdownImporter.vue -->
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
// Import a different style that's more visible
import 'highlight.js/styles/vs2015.css'

// Use specific languages to reduce bundle size and improve performance
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'

// Register the languages we need
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', html)
hljs.registerLanguage('css', css)
hljs.registerLanguage('bash', bash)

// Set up marked with better options
marked.setOptions({
  // Just return the original code - we'll highlight it manually 
  highlight: (code, lang) => {
    return code
  },
  gfm: true,
  breaks: true,
  pedantic: false,
  smartLists: true
})

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

// Store the rendered HTML content
const htmlContent = ref('')

// Function to fetch markdown content using fetch API
const fetchMarkdown = async (path) => {
  try {
    // Use fetch API to get the markdown content
    const response = await fetch(path)
    
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`)
    }
    
    return await response.text()
  } catch (error) {
    console.error('Error fetching markdown:', error)
    return '**Error loading documentation**'
  }
}

// Function to safely apply syntax highlighting
const applySyntaxHighlighting = () => {
  // Select all code blocks
  const codeBlocks = document.querySelectorAll('.markdown-content pre code')
  
  // Apply highlighting to each code block
  codeBlocks?.forEach((block) => {
    // Make sure block exists and has content
    if (!block || !block.textContent) {
      return
    }
    
    try {
      // Check if a language class is present
      const classList = block.className ? block.className.split(' ') : []
      const langClass = classList.find(cls => typeof cls === 'string' && cls.startsWith('language-'))
      
      if (langClass) {
        // Extract the language name
        const lang = langClass.replace('language-', '')
        
        // Apply highlighting if the language is supported
        if (lang && hljs.getLanguage(lang)) {
          hljs.highlightElement(block)
        } else {
          // Only apply auto-detection if we have content
          if (block.textContent.trim()) {
            hljs.highlightElement(block)
          }
        }
      } else {
        // Only apply auto-detection if we have content
        if (block.textContent.trim()) {
          hljs.highlightElement(block)
        }
      }
    } catch (error) {
      // Log the error but don't break the rendering
      console.warn('Error highlighting code block:', error)
      
      // Apply basic styling if highlighting fails
      block.classList.add('plain-code')
    }
  })
}

onMounted(async () => {
  try {
    // Get the base URL
    const baseUrl = import.meta.env.BASE_URL || '/'
    // Create a path that's relative to the public directory
    const fullPath = `${baseUrl}${props.path}`
    
    // Fetch and process the markdown
    const markdownContent = await fetchMarkdown(fullPath)
    
    // Only parse if we have content
    if (markdownContent && typeof markdownContent === 'string') {
      htmlContent.value = marked.parse(markdownContent)
      
      // Use nextTick to ensure the content is in the DOM before highlighting
      await nextTick()
      applySyntaxHighlighting()
    }
  } catch (error) {
    console.error('Error rendering markdown:', error)
    htmlContent.value = '<div class="error-message">Error loading content</div>'
  }
})
</script>

<template>
  <div class="markdown-content" v-html="htmlContent"></div>
</template>

<style>
.markdown-content {
  width: 100%;
}

/* Style code blocks more distinctly */
.markdown-content pre {
  border-radius: 8px;
  padding: 16px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5;
  margin: 1.5rem 0;
  background-color: #1e1e1e;
  border: 1px solid #333;
}

/* Make sure code font is consistent */
.markdown-content code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

/* Style tables */
.markdown-content table {
  border-collapse: collapse;
  margin: 1rem 0;
  width: 100%;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #ddd;
  padding: 8px 12px;
}

.markdown-content th {
  background-color: #f5f5f5;
  font-weight: 600;
}

/* Style for inline code */
.markdown-content :not(pre) > code {
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-size: 85%;
}

/* Adjust table styles for dark mode */
@media (prefers-color-scheme: dark) {
  .markdown-content table {
    border-color: #444;
  }

  .markdown-content th {
    background-color: #333;
    color: #fff;
  }

  .markdown-content td {
    background-color: #222;
    color: #ddd;
  }
}

/* Style for error messages */
.error-message {
  color: #e74c3c;
  padding: 1rem;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  background-color: rgba(231, 76, 60, 0.1);
  margin: 1rem 0;
}

/* Style for plain code when highlighting fails */
.plain-code {
  color: #e6e6e6;
}
</style>