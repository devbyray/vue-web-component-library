<script setup>
import { ref, watch, nextTick } from 'vue'

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
    editable: {
        type: Boolean,
        default: true
    },
    autoRender: {
        type: Boolean,
        default: false
    }
})

// Define emits for code changes
const emit = defineEmits(['update:code'])

// Create reactive references to track code changes
const currentCode = ref(props.code)
const displayCode = ref(props.code)
const previewContainer = ref(null)

// Watch for changes in the code prop and update the references
watch(() => props.code, (newCode) => {
    currentCode.value = newCode
    displayCode.value = newCode
    if (previewContainer.value) {
        renderComponent()
    }
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

// Function to manually trigger rendering
const renderCode = async () => {
    displayCode.value = currentCode.value
    await nextTick()
    renderComponent()
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
    } catch (err) {
        console.error('Error rendering component:', err)
        // Display error in the preview
        previewContainer.value.innerHTML = `<div style="color: red; padding: 10px;">Error: ${err.message}</div>`
    }
}

// Initial render
watch(previewContainer, (el) => {
    if (el) {
        renderComponent()
    }
}, { immediate: true })
</script>
<template>
    <div class="component-example">
        <h2 v-if="title">{{ title }}</h2>
        <div class="example-preview">
            <!-- Container for dynamically rendered component -->
            <div ref="previewContainer"></div>
        </div>
        <div class="example-code">
            <div v-if="editable" class="code-editor">
                <textarea 
                    :value="currentCode" 
                    @input="updateCode" 
                    class="code-textarea"
                    spellcheck="false"
                    rows="5"
                ></textarea>
                
                <!-- Add render button when not in auto-render mode -->
                <button 
                    v-if="!autoRender" 
                    @click="renderCode" 
                    class="render-button"
                    type="button"
                >
                    Render
                </button>
            </div>
            <pre v-else><code>{{ currentCode }}</code></pre>
        </div>
    </div>
    <hr />
</template>
<style scoped>
.component-example {
    margin: 20px 0;
}
.example-code {
    padding: 10px;
    border-end-end-radius: 5px;
    border-end-start-radius: 5px;
    margin-bottom: 20px;
    background-color: #5f5f5f;
    border: 1px solid #ccc;
}
.example-code pre {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
}
.example-preview {
    padding: 10px;
    border: 1px solid #ccc;
    border-start-end-radius: 5px;
    border-start-start-radius: 5px;
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
    background-color: #4a8bfc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.render-button:hover {
    background-color: #3a7bec;
}

.render-button:active {
    background-color: #2a6bdc;
}
</style>