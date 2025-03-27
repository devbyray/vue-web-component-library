/**
 * Common types used across the component library
 */

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface BaseProps {
  /** Additional custom classes */
  class?: string;
  /** Additional inline styles */
  style?: string | Record<string, string>;
  /** Optional ID for the element */
  id?: string;
  /** Whether the element is disabled */
  disabled?: boolean;
}