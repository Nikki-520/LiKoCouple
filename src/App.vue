<template>
  <CustomCursor />
  <FloatingElements />
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import CustomCursor from './components/CustomCursor.vue'
import FloatingElements from './components/FloatingElements.vue'
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.page-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.page-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
