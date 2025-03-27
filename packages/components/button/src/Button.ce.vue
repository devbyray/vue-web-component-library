<template>
  <button
    :id="props.id"
    :class="['vwc-button', props.size, props.variant]"
    :disabled="props.disabled"
    :aria-disabled="props.disabled"
    :type="props.type"
    @click="$emit('click', $event)"
  >
    <slot name="before"></slot>
    <slot></slot>
    <slot name="after"></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { BaseProps, Size, Variant } from '@vue-web-component-library/core';

export interface ButtonProps extends BaseProps {
  /**
   * The type of button
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * The size of the button
   */
  size?: Size;
  /**
   * The variant style of the button
   */
  variant?: Variant;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  size: 'md',
  variant: 'primary',
  disabled: false,
});

defineEmits<{
  /**
   * Emitted when button is clicked
   */
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style>
.vwc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--vwc-button-gap, 0.5rem);
  font-family: var(--vwc-button-font-family, system-ui, sans-serif);
  font-weight: var(--vwc-button-font-weight, 500);
  cursor: pointer;
  border-radius: var(--vwc-button-radius, 4px);
  border: var(--vwc-button-border, 1px solid transparent);
  padding: 0;
  transition: var(--vwc-button-transition, all 0.2s ease-in-out);
  outline: none;
  position: relative;
  text-decoration: none;
}

.vwc-button:focus-visible {
  outline: var(--vwc-button-focus-outline, 2px solid currentColor);
  outline-offset: var(--vwc-button-focus-outline-offset, 2px);
}

.vwc-button:disabled {
  opacity: var(--vwc-button-disabled-opacity, 0.5);
  cursor: not-allowed;
}

/* Size variations */
.vwc-button.sm {
  font-size: var(--vwc-button-sm-font-size, 0.875rem);
  padding: var(--vwc-button-sm-padding, 0.375rem 0.75rem);
  height: var(--vwc-button-sm-height, 2rem);
}

.vwc-button.md {
  font-size: var(--vwc-button-md-font-size, 1rem);
  padding: var(--vwc-button-md-padding, 0.5rem 1rem);
  height: var(--vwc-button-md-height, 2.5rem);
}

.vwc-button.lg {
  font-size: var(--vwc-button-lg-font-size, 1.125rem);
  padding: var(--vwc-button-lg-padding, 0.625rem 1.25rem);
  height: var(--vwc-button-lg-height, 3rem);
}

/* Variant styles */
.vwc-button.primary {
  background-color: var(--vwc-button-primary-bg, #3b82f6);
  color: var(--vwc-button-primary-text, white);
}

.vwc-button.primary:hover:not(:disabled) {
  background-color: var(--vwc-button-primary-hover-bg, #2563eb);
}

.vwc-button.secondary {
  background-color: var(--vwc-button-secondary-bg, #9ca3af);
  color: var(--vwc-button-secondary-text, white);
}

.vwc-button.secondary:hover:not(:disabled) {
  background-color: var(--vwc-button-secondary-hover-bg, #6b7280);
}

.vwc-button.outline {
  background-color: var(--vwc-button-outline-bg, transparent);
  color: var(--vwc-button-outline-text, #3b82f6);
  border-color: var(--vwc-button-outline-border, currentColor);
}

.vwc-button.outline:hover:not(:disabled) {
  background-color: var(--vwc-button-outline-hover-bg, rgb(59 130 246 / 0.1));
}

.vwc-button.ghost {
  background-color: var(--vwc-button-ghost-bg, transparent);
  color: var(--vwc-button-ghost-text, #3b82f6);
  border-color: var(--vwc-button-ghost-border, transparent);
}

.vwc-button.ghost:hover:not(:disabled) {
  background-color: var(--vwc-button-ghost-hover-bg, rgb(59 130 246 / 0.1));
}
</style>