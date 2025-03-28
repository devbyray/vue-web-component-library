// Export individual components with renamed exports to avoid conflicts
export { default as ButtonElement } from '@devbyray/vue-wc-button';
export { default as InputElement } from '@devbyray/vue-wc-input';
export { default as IconElement } from '@devbyray/vue-wc-icon';

// Import register functions with explicit names to avoid conflicts
import { register as registerButton } from '@devbyray/vue-wc-button';
import { register as registerInput } from '@devbyray/vue-wc-input';
import { register as registerIcon } from '@devbyray/vue-wc-icon';

/**
 * Register all components at once
 */
export const registerAll = () => {
  registerButton();
  registerInput();
  registerIcon();
};

// Auto-register when loaded in a browser
if (typeof window !== 'undefined') {
  registerAll();
}