import { defineCustomElement as VueDefineCustomElement } from 'vue';
import IconComponent from './Icon.ce.vue';
import { defineCustomElement, COMPONENT_NAMES } from '@devbyray/vue-wc-core';

// Define the Icon as a Vue custom element
const IconElement = VueDefineCustomElement(IconComponent);

// Register as custom element if it's not already registered
export const register = () => defineCustomElement(COMPONENT_NAMES.ICON, IconElement);

// Auto-register when loaded in a browser
if (typeof window !== 'undefined') {
  register();
}

export { IconComponent, IconElement };
export * from './Icon.ce.vue';

export default IconElement;