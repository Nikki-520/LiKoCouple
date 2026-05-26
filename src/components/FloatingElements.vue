<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" ref="containerRef">
    <div
      v-for="(p, i) in particles"
      :key="p.id"
      class="floating-particle absolute"
      :style="{
        left: p.left + '%',
        bottom: '-50px',
        fontSize: p.size + 'px',
        animationDuration: p.duration + 's',
        opacity: p.opacity
      }"
    >{{ p.emoji }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const particles = ref([])
const emojis = ['🌸', '✨', '💖', '☁️']
let intervalId = null
let idCounter = 0

function spawn() {
  const p = {
    id: idCounter++,
    left: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 10 + 10,
    opacity: Math.random(),
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  }
  particles.value.push(p)
  setTimeout(() => {
    particles.value = particles.value.filter(x => x.id !== p.id)
  }, 20000)
}

onMounted(() => {
  intervalId = setInterval(spawn, 2000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
