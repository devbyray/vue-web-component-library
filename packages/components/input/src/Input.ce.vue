<template>
  <div class="vwc-input-wrapper" :class="{ disabled: props.disabled }">
    <label v-if="props.label" :for="inputId" class="vwc-input-label">
      {{ props.label }}
      <span v-if="props.required" class="vwc-input-required">*</span>
    </label>
    <div class="vwc-input-container" :class="[props.size, { 'has-error': !!props.error }]">
      <slot name="before"></slot>
      <input
        :id="inputId"
        ref="inputRef"
        class="vwc-input"
        :type="props.type"
        :value="props.modelValue"
        :name="props.name"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :required="props.required"
        :aria-required="props.required"
        :aria-invalid="!!props.error"
        :aria-describedby="props.error ? `${inputId}-error` : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <slot name="after"></slot>
    </div>
    <div v-if="props.error" :id="`${inputId}-error`" class="vwc-input-error">
      {{ props.error }}
    </div>
    <div v-if="props.helperText && !props.error" class="vwc-input-helper">
      {{ props.helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { BaseProps, Size } from '@vue-web-component-library/core';

export interface InputProps extends BaseProps {
  /**
   * The input's value
   */
  modelValue?: string;
  /**
   * The input's name
   */
  name?: string;
  /**
   * The input's type
   */
  type?: string;
  /**
   * The input's placeholder
   */
  placeholder?: string;
  /**
   * The size of the input
   */
  size?: Size;
  /**
   * The input's label
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  required: false,
});

defineEmits<{
  /**
   * Update model value event
   */
  (e: 'update:modelValue', value: string): void;
  /**
   * Focus event
   */
  (e: 'focus', event: FocusEvent): void;
  /**
   * Blur event
   */
  (e: 'blur', event: FocusEvent): void;
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 9)}`);
</script>

<style>
.vwc-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--vwc-input-gap, 0.375rem);
  width: 100%;
}

.vwc-input-label {
  font-size: var(--vwc-input-label-font-size, 0.875rem);
  font-weight: var(--vwc-input-label-font-weight, 500);
  color: var(--vwc-input-label-color, #374151);
  margin-bottom: var(--vwc-input-label-margin-bottom, 0.25rem);
}

.vwc-input-required {
  color: var(--vwc-input-required-color, #ef4444);
  margin-left: var(--vwc-input-required-margin, 0.125rem);
}

.vwc-input-container {
  display: flex;
  align-items: center;
  border: var(--vwc-input-border, 1px solid #d1d5db);
  border-radius: var(--vwc-input-radius, 4px);
  background-color: var(--vwc-input-bg, white);
  transition: var(--vwc-input-transition, all 0.2s ease-in-out);
  position: relative;
}

.vwc-input-container:focus-within {
  border-color: var(--vwc-input-focus-border-color, #3b82f6);
  box-shadow: var(--vwc-input-focus-ring, 0 0 0 2px rgb(59 130 246 / 0.25));
}

.vwc-input-container.has-error {
  border-color: var(--vwc-input-error-border-color, #ef4444);
}

.vwc-input-container.has-error:focus-within {
  box-shadow: var(--vwc-input-error-focus-ring, 0 0 0 2px rgb(239 68 68 / 0.25));
}

.vwc-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--vwc-input-font-family, system-ui, sans-serif);
  color: var(--vwc-input-text-color, #1f2937);
}

.vwc-input::placeholder {
  color: var(--vwc-input-placeholder-color, #9ca3af);
}

.vwc-input-wrapper.disabled .vwc-input-container {
  background-color: var(--vwc-input-disabled-bg, #f3f4f6);
  border-color: var(--vwc-input-disabled-border-color, #d1d5db);
}

.vwc-input-wrapper.disabled .vwc-input {
  cursor: not-allowed;
  color: var(--vwc-input-disabled-text-color, #6b7280);
}

.vwc-input-error {
  font-size: var(--vwc-input-error-font-size, 0.75rem);
  color: var(--vwc-input-error-color, #ef4444);
  margin-top: var(--vwc-input-error-margin-top, 0.25rem);
}

.vwc-input-helper {
  font-size: var(--vwc-input-helper-font-size, 0.75rem);
  color: var(--vwc-input-helper-color, #6b7280);
  margin-top: var(--vwc-input-helper-margin-top, 0.25rem);
}

/* Size variations */
.vwc-input-container.sm {
  height: var(--vwc-input-sm-height, 2rem);
}

.vwc-input-container.sm .vwc-input {
  padding: var(--vwc-input-sm-padding, 0.375rem 0.75rem);
  font-size: var(--vwc-input-sm-font-size, 0.875rem);
}

.vwc-input-container.md {
  height: var(--vwc-input-md-height, 2.5rem);
}

.vwc-input-container.md .vwc-input {
  padding: var(--vwc-input-md-padding, 0.5rem 1rem);
  font-size: var(--vwc-input-md-font-size, 1rem);
}

.vwc-input-container.lg {
  height: var(--vwc-input-lg-height, 3rem);
}

.vwc-input-container.lg .vwc-input {
  padding: var(--vwc-input-lg-padding, 0.625rem 1.25rem);
  font-size: var(--vwc-input-lg-font-size, 1.125rem);
}
</style>