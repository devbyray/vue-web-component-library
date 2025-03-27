// Export individual components with renamed exports to avoid conflicts
export { default as ButtonElement } from '@vue-web-component-library/button';
export { default as InputElement } from '@vue-web-component-library/input';
export { default as IconElement } from '@vue-web-component-library/icon';

// Import register functions with explicit names to avoid conflicts
import { register as registerButton } from '@vue-web-component-library/button';
import { register as registerInput } from '@vue-web-component-library/input';
import { register as registerIcon } from '@vue-web-component-library/icon';

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