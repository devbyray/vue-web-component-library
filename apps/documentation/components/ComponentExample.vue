<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

// Define props with default values to simplify usage in markdown
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    code: {
        type: String,
        default: ''
    },
    style: {
        type: String,
        default: ''
    },
    editable: {
        type: Boolean,
        default: true
    },
    autoRender: {
        type: Boolean,
        default: false
    }
})

// Define emits for code and style changes
const emit = defineEmits(['update:code', 'update:style'])

// Create reactive references to track code and style changes
const currentCode = ref(props.code)
const currentStyle = ref(typeof props.style === 'string' ? props.style : '')
const displayCode = ref(props.code)
const displayStyle = ref(typeof props.style === 'string' ? props.style : '')
const previewContainer = ref(null)
const styleElement = ref(null)

// Track the active tab (code or style)
const activeTab = ref('code')

// Watch for changes in the code prop and update the references
watch(() => props.code, (newCode) => {
    currentCode.value = newCode
    displayCode.value = newCode
    if (previewContainer.value) {
        renderComponent()
    }
})

// Watch for changes in the style prop
watch(() => props.style, (newStyle) => {
    // Handle case where style might not be a string
    const styleStr = typeof newStyle === 'string' ? newStyle : ''
    currentStyle.value = styleStr
    displayStyle.value = styleStr
    applyStyles()
})

// Handle code changes from the textarea
const updateCode = (event) => {
    currentCode.value = event.target.value
    // Emit the updated code to the parent component
    emit('update:code', currentCode.value)
    
    // If autoRender is true, update the display code immediately
    if (props.autoRender) {
        renderCode()
    }
}

// Handle style changes from the textarea
const updateStyle = (event) => {
    currentStyle.value = event.target.value
    // Emit the updated style to the parent component
    emit('update:style', currentStyle.value)
    
    // If autoRender is true, update the styles immediately
    if (props.autoRender) {
        applyStyles()
    }
}

// Function to toggle between tabs
const setActiveTab = (tab) => {
    activeTab.value = tab
}

// Function to manually trigger rendering
const renderCode = async () => {
    displayCode.value = currentCode.value
    displayStyle.value = currentStyle.value
    await nextTick()
    renderComponent()
    applyStyles()
}

// Function to apply styles to the preview
const applyStyles = () => {
    // Don't proceed if there's no content or container
    if (!displayStyle.value || !previewContainer.value) return
    
    try {
        // Create a style element if it doesn't exist
        if (!styleElement.value) {
            styleElement.value = document.createElement('style')
            styleElement.value.id = `component-example-style-${Math.random().toString(36).substring(2, 9)}`
            
            // Add to document head to ensure CSS variables are available globally
            document.head.appendChild(styleElement.value)
        }
        
        // Update the style content with properly scoped CSS
        // We create a unique class for this example and prefix all rules with it
        const uniqueClass = `example-${Math.random().toString(36).substring(2, 9)}`
        
        // Add the unique class to our preview container
        previewContainer.value.parentNode.classList.add(uniqueClass)
        
        // Process styles to ensure they affect web components
        // For CSS variables, we need to apply them to both :root and the container
        let processedStyles = displayStyle.value
        
        // If styles contain :root selector with CSS variables, add them to our unique class too
        if (processedStyles.includes(':root')) {
            processedStyles = processedStyles.replace(/:root\s*{/g, `:root, .${uniqueClass} {`)
        } else {
            // Otherwise, wrap everything in our unique class
            processedStyles = `.${uniqueClass} {\n${displayStyle.value}\n}`
        }
        
        // Update the style element
        styleElement.value.textContent = processedStyles
        
        // Log for debugging (helpful for users to see what's happening)
        console.log('Applied styles with unique class:', uniqueClass)
    } catch (err) {
        console.error('Error applying styles:', err)
    }
}

// Function to convert string to actual component
const renderComponent = async () => {
    if (!previewContainer.value) return

    try {
        // Force re-render by clearing the container first
        previewContainer.value.innerHTML = ''
        
        // Create a wrapper div to hold the rendered component
        const wrapper = document.createElement('div')
        wrapper.setAttribute('data-v-component', 'true')
        
        // Add a class that can be used by our style system to target this specific instance
        wrapper.classList.add('component-instance')
        
        previewContainer.value.appendChild(wrapper)
        
        // Make sure the web components are defined before inserting them
        try {
            // Wait for web components to be registered with a timeout
            await Promise.race([
                customElements.whenDefined('vwc-button'),
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
            await Promise.race([
                customElements.whenDefined('vwc-input'),
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
            await Promise.race([
                customElements.whenDefined('vwc-icon'),
                new Promise(resolve => setTimeout(resolve, 2000))
            ])
        } catch (err) {
            // Continue anyway, components might be registered later
            console.warn('Component registration timeout:', err)
        }
        
        // Insert the code directly as HTML
        wrapper.innerHTML = displayCode.value
        
        // Force the browser to re-evaluate styles by triggering a reflow
        // This helps with making custom properties apply to web components
        void previewContainer.value.offsetHeight
    } catch (err) {
        console.error('Error rendering component:', err)
        // Display error in the preview
        previewContainer.value.innerHTML = `<div style="color: red; padding: 10px;">Error: ${err.message}</div>`
    }
}

// Clean up style element when component is unmounted
onBeforeUnmount(() => {
    if (styleElement.value && styleElement.value.parentNode) {
        styleElement.value.parentNode.removeChild(styleElement.value)
    }
})

// Initial render
watch(previewContainer, (el) => {
    if (el) {
        renderComponent()
        applyStyles()
    }
}, { immediate: true })
</script>
<template>
    <div class="component-example">
        <h2 v-if="title">{{ title }}</h2>
        <div class="example-preview">
            <!-- Container for dynamically rendered component -->
            <div ref="previewContainer"></div>
            
            <!-- Render button moved above the fold -->
            <button 
                v-if="editable && !autoRender" 
                @click="renderCode" 
                class="render-button render-button-preview"
                type="button"
            >
                Render Changes
            </button>
        </div>
        
        <!-- Tab navigation for code and style -->
        <div v-if="editable" class="example-tabs">
            <button 
                class="tab-button" 
                :class="{ 'active': activeTab === 'code' }"
                @click="setActiveTab('code')"
            >
                HTML
            </button>
            <button 
                class="tab-button" 
                :class="{ 'active': activeTab === 'style' }"
                @click="setActiveTab('style')"
            >
                CSS
            </button>
        </div>
        
        <div class="example-code">
            <!-- Code editor tab -->
            <div v-if="editable && activeTab === 'code'" class="code-editor">
                <textarea 
                    :value="currentCode" 
                    @input="updateCode" 
                    class="code-textarea"
                    spellcheck="false"
                    rows="5"
                    placeholder="Enter HTML code here"
                ></textarea>
            </div>
            
            <!-- Style editor tab -->
            <div v-if="editable && activeTab === 'style'" class="code-editor">
                <textarea 
                    :value="currentStyle" 
                    @input="updateStyle" 
                    class="code-textarea"
                    spellcheck="false"
                    rows="5"
                    placeholder="Enter CSS code here e.g. :root { --vwc-button-primary-bg: red; }"
                ></textarea>
            </div>
            
            <!-- Read-only code display -->
            <pre v-if="!editable"><code>{{ currentCode }}</code></pre>
        </div>
    </div>
    <hr />
</template>
<style scoped>
.component-example {
    margin: 20px 0;
}

.example-tabs {
    display: flex;
    border-start-end-radius: 5px;
    border-start-start-radius: 5px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-bottom: none;
}

.tab-button {
    flex: 1;
    padding: 0.5rem 1rem;
    background-color: #3d3d3d;
    color: #e6e6e6;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
}

.tab-button:hover {
    background-color: #4a4a4a;
}

.tab-button.active {
    background-color: #5f5f5f;
    font-weight: bold;
}

.example-code {
    padding: 10px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-bottom: 20px;
    background-color: #5f5f5f;
    border: 1px solid #ccc;
    border-top: none;
}

.example-tabs + .example-code {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.example-code pre {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
}

.render-button-preview {
    position: absolute;
    bottom: 10px;
    right: 10px;
    margin-top: 0;
    background-color: rgba(137, 255, 18, 0.9);
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.example-preview {
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.example-preview > * {
    margin: 0;
}
.example-preview > :not(:last-child) {
    margin-bottom: 10px;
}
.example-preview > :last-child {
    margin-bottom: 0;
}
.example-preview > :first-child {
    margin-top: 0;
}
.example-preview > :last-child {
    margin-bottom: 0;
}

.code-editor {
    position: relative;
    width: 100%;
}

.code-textarea {
    width: 100%;
    min-height: 100px;
    font-family: monospace;
    padding: 10px;
    background-color: #2d2d2d;
    color: #e6e6e6;
    border: none;
    resize: vertical;
    font-size: 14px;
    line-height: 1.5;
}

.code-textarea:focus {
    outline: 1px solid #4a8bfc;
}

.render-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: rgba(137, 255, 18, 0.9);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.render-button:hover {
    background-color: rgba(102, 203, 1, 0.9);
}

.render-button:active {
    background-color: rgba(137, 255, 18, 0.9);
    transform: scale(0.98);
}
</style>