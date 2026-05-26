<template>
  <span
    id="custom-cursor"
    class="material-symbols-outlined"
    data-weight="fill"
    ref="cursorRef"
  >favorite</span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref(null)
let mouseX = 0, mouseY = 0
let cursorX = 0, cursorY = 0
let animFrameId = null

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (Math.random() > 0.85) {
    createParticle(e.clientX, e.clientY)
  }
}

function animateCursor() {
  const dx = mouseX - cursorX
  const dy = mouseY - cursorY
  cursorX += dx * 0.15
  cursorY += dy * 0.15
  if (cursorRef.value) {
    cursorRef.value.style.left = `${cursorX}px`
    cursorRef.value.style.top = `${cursorY}px`
  }
  animFrameId = requestAnimationFrame(animateCursor)
}

function createParticle(x, y) {
  const p = document.createElement('div')
  p.className = 'cursor-particle material-symbols-outlined'
  p.textContent = Math.random() > 0.5 ? 'favorite' : 'sparkle'
  p.style.left = `${x}px`
  p.style.top = `${y}px`
  p.style.fontSize = `${Math.random() * 10 + 5}px`
  p.style.color = Math.random() > 0.5 ? '#FFAB76' : '#FFE4D6'
  p.style.opacity = '1'
  document.body.appendChild(p)

  const endX = x + (Math.random() - 0.5) * 100
  const endY = y + (Math.random() - 0.5) * 100
  const duration = 1500 + Math.random() * 1000

  const startTime = performance.now()
  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    p.style.left = `${x + (endX - x) * progress}px`
    p.style.top = `${y + (endY - y) * progress}px`
    p.style.opacity = `${1 - progress}`
    p.style.transform = `rotate(${progress * 360}deg)`
    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      p.remove()
    }
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  animFrameId = requestAnimationFrame(animateCursor)
  document.body.style.cursor = 'none'
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  if (animFrameId) cancelAnimationFrame(animFrameId)
  document.body.style.cursor = ''
})
</script>
