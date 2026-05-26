<template>
  <div class="min-h-screen relative" style="background-color: #fff8f5;">
    <div class="absolute inset-0 z-0">
      <img :src="bgUrl" class="w-full h-full object-cover opacity-25" alt="" />
    </div>
    <div class="absolute inset-0 z-0" style="background-image: radial-gradient(#f5d6c6 1px, transparent 1px); background-size: 40px 40px; opacity: 0.6;"></div>

    <AppBar @login="showLogin = true" />

    <main class="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center overflow-hidden z-10">
      <div class="w-full max-w-6xl mx-auto px-margin-mobile relative flex flex-col items-center pt-8 md:pt-16">
        <p class="font-label-md text-label-md text-text-muted tracking-wider mb-1">从2023年4月28日起</p>
        <div class="central-hub mb-8 md:mb-16">
          <div class="relative w-64 flex flex-col items-center justify-center pt-2">
            <div class="relative z-10 text-center">
              <h1 class="font-display-lg text-display-lg text-secondary tracking-tighter leading-none">{{ days }} Days</h1>
              <p class="font-body-md text-body-md text-text-muted opacity-80 mt-1 text-sm">
                <span ref="typewriterRef" class="inline-block">爱在一起的每一刻</span>
                <span v-if="typing" class="inline-block animate-pulse ml-0.5">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-gutter md:absolute md:inset-0 w-full h-full pointer-events-none" style="max-width: 1400px; margin: 0 auto;">
        <div class="bobby-card bento-card pointer-events-auto md:absolute md:top-[60%] md:left-[5%] cursor-pointer" style="transform: rotate(-2deg);" @click="$router.push('/diary')">
          <div class="bg-surface-container-low p-md w-full max-w-[180px] wobbly-border relative group">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-secondary-fixed/50 backdrop-blur-sm transform rotate-1"></div>
            <span class="material-symbols-outlined text-secondary text-4xl block mb-sm">auto_stories</span>
            <h3 class="font-headline-md text-headline-md text-ink-brown">时光日记</h3>
            <p class="font-label-md text-text-muted mt-xs">记录下我们的每一天...</p>
          </div>
        </div>

        <div class="bobby-card bento-card pointer-events-auto md:absolute md:top-[50%] md:right-[15%]" style="transform: rotate(4deg);">
          <div class="bg-white p-2 pb-8 w-full max-w-[170px] shadow-lg border border-outline-variant/20">
            <img class="w-full aspect-square object-cover mb-4" :src="polaroidUrl" alt="记忆照片" />
            <p class="font-handwriting-lg text-secondary text-center text-sm">夕阳下的漫步</p>
          </div>
        </div>

        <div class="bobby-card bento-card pointer-events-auto md:absolute md:right-[5%] md:top-[70%]" style="transform: rotate(-3deg);">
          <div class="bg-tertiary-container/40 p-md w-full max-w-[190px] wobbly-border relative">
            <div class="absolute -top-4 left-4 w-6 h-6 bg-error rounded-full shadow-inner border-2 border-white/50"></div>
            <span class="material-symbols-outlined text-tertiary text-4xl block mb-sm">favorite</span>
            <h3 class="font-headline-md text-headline-md text-ink-brown">我们的纪念日</h3>
            <p class="font-label-md text-text-muted mt-xs">下一个惊喜在 {{ nextCountdown }}天 后</p>
          </div>
        </div>

        <div class="bobby-card bento-card pointer-events-auto md:absolute md:bottom-[10%] md:right-[30%] cursor-pointer" style="transform: rotate(2deg);" @click="$router.push('/wishlist')">
          <div class="bg-surface p-md w-full max-w-[200px] shadow-sm relative overflow-hidden">
            <div class="absolute bottom-0 left-0 right-0 h-2 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <span class="material-symbols-outlined text-secondary-container text-4xl block mb-sm">temp_preferences_custom</span>
            <h3 class="font-headline-md text-headline-md text-ink-brown">心愿清单</h3>
            <div class="space-y-1 mt-xs">
              <div class="flex items-center gap-xs text-label-md"><span class="w-2 h-2 rounded-full bg-secondary"></span>去北海道看雪</div>
              <div class="flex items-center gap-xs text-label-md opacity-60 line-through"><span class="w-2 h-2 rounded-full bg-outline"></span>一起看日出</div>
            </div>
          </div>
        </div>

        <div class="bobby-card bento-card pointer-events-auto md:absolute md:bottom-[5%] md:left-[20%] cursor-pointer" style="transform: rotate(-4deg);" @click="$router.push('/messages')">
          <div class="bg-primary-container/60 p-md w-full max-w-[210px] wobbly-border">
            <span class="material-symbols-outlined text-primary text-4xl block mb-sm">forum</span>
            <h3 class="font-headline-md text-headline-md text-ink-brown">爱的留言板</h3>
            <p class="italic text-secondary font-handwriting-lg text-sm mt-xs">"今天也要记得喝水呀~"</p>
          </div>
        </div>

        <div class="bobby-card bento-card pointer-events-auto md:absolute md:top-[40%] md:left-[15%]" style="transform: rotate(5deg);">
          <div class="bg-surface-container-highest p-md w-full max-w-[160px] rounded-full shadow-md flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-ink-brown rounded-full flex items-center justify-center animate-spin-slow mb-sm">
              <div class="w-6 h-6 bg-secondary-fixed rounded-full"></div>
            </div>
            <h3 class="font-label-md text-ink-brown">八音盒</h3>
          </div>
        </div>

        <div class="bobby-card bento-card pointer-events-auto md:absolute md:top-[65%] md:left-[40%]" style="transform: rotate(-1deg);">
          <div class="bg-white/80 backdrop-blur-md p-md w-full max-w-[180px] wobbly-border">
            <span class="material-symbols-outlined text-secondary text-4xl block mb-sm">quiz</span>
            <h3 class="font-headline-md text-headline-md text-ink-brown">默契测试</h3>
            <p class="font-label-md text-text-muted mt-xs">新题目上线！去挑战吧</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="md:hidden bg-surface-container-low/90 backdrop-blur-xl fixed bottom-0 w-full z-50 rounded-t-xl shadow-lg flex justify-around items-center h-16 px-xs pb-safe border-t border-outline-variant/30">
      <div class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-all">
        <span class="material-symbols-outlined">auto_stories</span>
        <span class="font-label-md text-[10px]">时光</span>
      </div>
      <div class="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
        <span class="material-symbols-outlined">photo_album</span>
        <span class="font-label-md text-[10px]">相册</span>
      </div>
      <div class="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
        <span class="material-symbols-outlined">favorite</span>
        <span class="font-label-md text-[10px]">纪念日</span>
      </div>
      <div class="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
        <span class="material-symbols-outlined">temp_preferences_custom</span>
        <span class="font-label-md text-[10px]">心愿</span>
      </div>
      <div class="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
        <span class="material-symbols-outlined">more_horiz</span>
        <span class="font-label-md text-[10px]">更多</span>
      </div>
    </footer>

    <button class="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-secondary-container text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40 group">
      <span class="material-symbols-outlined text-3xl group-hover:rotate-45 transition-transform">add</span>
    </button>

    <LoginModal :visible="showLogin" @close="showLogin = false" @logged-in="loggedIn = true" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppBar from '../components/AppBar.vue'
import LoginModal from '../components/LoginModal.vue'

const showLogin = ref(false)
const loggedIn = ref(false)
const typewriterRef = ref(null)
const typing = ref(true)

const bgUrl = 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&q=60'

const startDate = new Date(2023, 3, 28)
const days = computed(() => {
  const now = new Date()
  const diff = now.getTime() - startDate.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
})

const nextCountdown = ref(15)

const polaroidUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDxTLcHP7qrOUWXlp55FoRUtwHrq5nwDxcAJRTHSB1txQ-Ikm_jFadvH02I6OZnLjbJYRJF0OnfpowbbnT-lceVJJRyncju8QsdzmX3cHyGNGErI2EMsdGL3UfTt8nQSL4cGqSbeZ0AU5OXaAW_Y1ZIS7IEfIgXjTughwAD33Pw-SWDqd-6Rb1YaY7Bekq7uhbhu7b6oT1qM7flRaAiQgiaEKoFEkahuR_3azXDPuFe8O38JHpZlB0fPQ_3PYBVo-7t6RFtG_FF6QP'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function getCachedQuote() {
  try {
    const raw = localStorage.getItem('liko_quote')
    if (raw) {
      const cache = JSON.parse(raw)
      if (cache.date === todayKey()) return cache.quote
    }
  } catch {}
  return null
}

function setCachedQuote(quote) {
  localStorage.setItem('liko_quote', JSON.stringify({ date: todayKey(), quote }))
}

async function fetchQuote() {
  try {
    const res = await fetch('https://api.suyanw.cn/api/love.php')
    const text = await res.text()
    try {
      const data = JSON.parse(text)
      return data.hitokoto || data.text || data.content || data.data || text
    } catch {
      return text
    }
  } catch {
    return null
  }
}

async function getTodayQuote() {
  let quote = getCachedQuote()
  if (!quote) {
    quote = await fetchQuote()
    if (quote) setCachedQuote(quote)
  }
  return quote || '爱在一起的每一刻'
}

async function typeWrite(text) {
  const el = typewriterRef.value
  if (!el) return

  typing.value = true
  let i = 0
  el.textContent = ''

  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i]
        i++
      } else {
        clearInterval(timer)
        typing.value = false
        resolve()
      }
    }, 80)
  })
}

onMounted(async () => {
  const quote = await getTodayQuote()
  await new Promise(r => setTimeout(r, 600))
  typeWrite(quote)
})
</script>
