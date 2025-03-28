import { defineCustomElement as VueDefineCustomElement } from 'vue';
import InputComponent from './Input.ce.vue';
import { defineCustomElement, COMPONENT_NAMES } from '@devbyray/vue-wc-core';

// Define the Input as a Vue custom element
const InputElement = VueDefineCustomElement(InputComponent);

// Register as custom element if it's not already registered
export const register = () => defineCustomElement(COMPONENT_NAMES.INPUT, InputElement);

// Auto-register when loaded in a browser
if (typeof window !== 'undefined') {
  register();
}

export { InputComponent, InputElement };
export * from './Input.ce.vue';

export default InputElement;