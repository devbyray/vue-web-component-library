/**
 * Utility functions for the component library
 */

/**
 * Creates a custom web component from a Vue component
 * @param tag The tag name for the web component
 * @param component The Vue component definition
 */
export function defineCustomElement(tag: string, component: any) {
  if (!customElements.get(tag)) {
    const CustomElement = component.customElement || component;
    customElements.define(tag, CustomElement);
  }
}

/**
 * Converts kebab-case to camelCase
 * @param str String in kebab-case
 * @returns String in camelCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

/**
 * Converts camelCase to kebab-case
 * @param str String in camelCase
 * @returns String in kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}