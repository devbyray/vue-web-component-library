<template>
  <span
    :id="props.id"
    class="vwc-icon"
    :class="[props.size, { 'vwc-icon-spin': props.spin }]"
    :aria-hidden="!props.label"
    :aria-label="props.label"
    :role="props.label ? 'img' : undefined"
  >
    <span class="material-icons" :style="iconStyles">{{ props.name }}</span>
  </span>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { BaseProps, Size } from '@devbyrayray/vue-wc-core';

export interface IconProps extends /* @vue-ignore */ BaseProps {
  /**
   * The name of the Material Icon
   */
  name: string;
  /**
   * The size of the icon
   */
  size?: Size;
  /**
   * The color of the icon (CSS color value)
   */
  color?: string;
  /**
   * The label for screen readers (for accessibility)
   */
  label?: string;
  /**
   * Whether the icon should spin
   */
  spin?: boolean;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  disabled: false,
  spin: false,
});

const iconStyles = computed(() => {
  return {
    color: props.color || 'currentColor',
  };
});
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.vwc-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  width: var(--vwc-icon-size, auto);
  height: var(--vwc-icon-size, auto);
  color: var(--vwc-icon-color, currentColor);
  user-select: none;
}

.vwc-icon.sm {
  font-size: var(--vwc-icon-sm-size, 1rem);
}

.vwc-icon.md {
  font-size: var(--vwc-icon-md-size, 1.5rem);
}

.vwc-icon.lg {
  font-size: var(--vwc-icon-lg-size, 2rem);
}

.vwc-icon-spin {
  animation: vwc-icon-spin var(--vwc-icon-spin-duration, 2s) infinite linear;
}

@keyframes vwc-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>