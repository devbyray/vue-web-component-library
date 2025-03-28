<script setup>
import HelloWorld from './components/HelloWorld.vue'
import '@devbyray/vue-wc-components'
</script>

<template>
  <header>
    <!-- Button component -->
    <vwc-button size="md" variant="primary">Click me <vwc-icon name="home" size="md"
        color="#fff"></vwc-icon></vwc-button>

    <!-- Input component -->
    <vwc-input placeholder="Enter your username"></vwc-input>

    <!-- Icon component -->
    <vwc-icon name="person" size="lg" color="#FFD700"></vwc-icon>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}
</style>
