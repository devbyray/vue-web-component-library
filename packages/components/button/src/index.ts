import { defineCustomElement as VueDefineCustomElement } from 'vue';
import ButtonComponent from './Button.ce.vue';
import { defineCustomElement, COMPONENT_NAMES } from '@vue-web-component-library/core';

// Define the Button as a Vue custom element
const ButtonElement = VueDefineCustomElement(ButtonComponent);

// Register as custom element if it's not already registered
export const register = () => defineCustomElement(COMPONENT_NAMES.BUTTON, ButtonElement);

// Auto-register when loaded in a browser
if (typeof window !== 'undefined') {
  register();
}

export { ButtonComponent, ButtonElement };
export * from './Button.ce.vue';

export default ButtonElement;