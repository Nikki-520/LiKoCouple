<template>
  <header class="bg-surface/80 backdrop-blur-md text-primary sticky top-0 z-50 shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop py-xs w-full">
    <div class="font-handwriting-lg text-handwriting-lg text-secondary tracking-tighter hover:scale-105 transition-transform cursor-pointer" @click="$router.push('/home')">
      LiKo
    </div>
    <nav class="hidden md:flex gap-lg items-center">
      <a class="text-secondary font-bold font-label-md text-label-md" href="#">时光</a>
      <a class="text-text-muted hover:text-secondary-container transition-colors font-label-md text-label-md" href="#">相册</a>
      <a class="text-text-muted hover:text-secondary-container transition-colors font-label-md text-label-md" href="#">纪念日</a>
      <a class="text-text-muted hover:text-secondary-container transition-colors font-label-md text-label-md" href="#">更多</a>
    </nav>
    <button
      class="bg-secondary-container text-on-secondary-container px-md py-xs rounded-full font-label-md text-label-md shadow-sm hover:scale-105 transition-all"
      @click="$emit('login')"
    >
      {{ isLoggedIn ? auth.currentName : '💕 登录' }}
    </button>
  </header>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

defineEmits(['login'])

const { auth, isLoggedIn } = useAuth()
</script>
