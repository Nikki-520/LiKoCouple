<template>
<div class="unlock-page">
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img :src="bgUrl" class="w-full h-full object-cover" alt="" />
      <div class="absolute inset-0 bg-primary-container/50 backdrop-blur-[2px]"></div>
    </div>

    <div class="floating-element drift top-20 left-20 text-secondary-container" style="font-size: 40px; z-index: 1;">🌸</div>
    <div class="floating-element drift top-40 right-40 text-primary-fixed-dim" style="font-size: 32px; animation-delay: 1s; z-index: 1;">✨</div>
    <div class="floating-element drift bottom-20 left-1/4 text-tertiary-fixed-dim" style="font-size: 28px; animation-delay: 2s; z-index: 1;">☁️</div>
    <div class="floating-element drift bottom-40 right-1/4 text-secondary-fixed" style="font-size: 36px; animation-delay: 3s; z-index: 1;">🎈</div>

    <main class="min-h-screen flex flex-col items-center justify-center p-margin-mobile relative z-10" ref="mainRef">
      <div class="book-stage mb-12">
        <div class="book-wrapper">
          <div class="book" ref="bookRef">

            <div class="book-back-cover"></div>
            <div class="book-pages-edge"></div>

            <div class="book-inner-pages" ref="innerRef">
              <div class="p-10 flex flex-col items-center space-y-5 h-full justify-center text-center">
                <div class="page-shadow-ref" ref="shadowRef"></div>
                <span class="material-symbols-outlined text-secondary text-3xl animate-bounce">favorite</span>
                <h2 class="font-handwriting-lg text-ink-brown text-xl">欢迎回家</h2>
                <p class="font-body-md text-body-md text-text-muted leading-relaxed">
                  每一个小小的日常，<br />都是值得被珍藏的奇迹。
                </p>
                <button
                  class="mt-4 bg-secondary-container text-white px-6 py-2.5 rounded-full font-label-md text-label-md hover:scale-110 transition-transform shadow-lg shadow-peach/30"
                  @click.stop="goHome"
                >
                  进入时光机
                </button>
              </div>
            </div>

            <div class="book-cover" ref="coverRef" @click="handleBookClick" @mouseenter="onCoverHover" @mouseleave="onCoverLeave">
              <div class="book-cover-front">
                <div class="book-cover-shine"></div>
                <img :src="coverUrl" alt="LiKo Cover" />
              </div>
              <div class="book-cover-back">
                <div class="flex flex-col items-center gap-4 p-6 text-center">
                  <div class="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-secondary/40 text-3xl">auto_stories</span>
                  </div>
                  <div>
                    <p class="font-handwriting-lg text-ink-brown/40 text-sm tracking-widest">LiKo</p>
                    <p class="font-label-md text-label-md text-text-muted/30 mt-1">封面背面</p>
                  </div>
                  <div class="border-t border-dashed border-secondary/10 w-24 pt-4 flex justify-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-secondary/15"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-secondary/15"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-secondary/15"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="book-spine">
              <span class="book-spine-title">LiKo</span>
            </div>

          </div>
        </div>
      </div>

      <div class="text-center transition-opacity duration-700" :class="{ 'opacity-0': isOpen }">
        <p class="font-label-md text-label-md text-ink-brown/60 tracking-widest uppercase">
          点击封面翻开我们的故事
        </p>
        <div class="mt-4 flex justify-center space-x-2">
          <span class="w-1.5 h-1.5 bg-ink-brown/20 rounded-full"></span>
          <span class="w-1.5 h-1.5 bg-ink-brown/20 rounded-full"></span>
          <span class="w-1.5 h-1.5 bg-ink-brown/20 rounded-full"></span>
        </div>
      </div>
    </main>
  </div>

  <footer class="beian-footer">
    <div class="inline-flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        苏ICP备2026034241号-1
      </a>
      <span class="opacity-30 select-none">|</span>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=苏xxxxxx" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1">
        <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" class="beian-icon" alt="" />
        苏公网安备 苏xxxxxx号
      </a>
    </div>
  </footer>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()
const mainRef = ref(null)
const bookRef = ref(null)
const coverRef = ref(null)
const innerRef = ref(null)
const shadowRef = ref(null)
const isOpen = ref(false)
const isAnimating = ref(false)

const bgUrl = 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1920&q=70'
const coverUrl = '/cover.png'

function createParticle(x, y) {
  const p = document.createElement('div')
  p.className = 'cursor-particle material-symbols-outlined'
  p.textContent = Math.random() > 0.5 ? 'favorite' : 'sparkle'
  p.style.left = `${x}px`
  p.style.top = `${y}px`
  p.style.fontSize = `${Math.random() * 10 + 5}px`
  p.style.color = Math.random() > 0.5 ? '#FFAB76' : '#FFE4D6'
  document.body.appendChild(p)

  gsap.to(p, {
    y: y + (Math.random() - 0.5) * 100,
    x: x + (Math.random() - 0.5) * 100,
    opacity: 0,
    rotation: Math.random() * 360,
    duration: 1.5 + Math.random(),
    onComplete: () => p.remove()
  })
}

function handleBookClick() {
  if (!isOpen.value && !isAnimating.value) {
    openBook()
  }
}

function openBook() {
  if (isOpen.value || isAnimating.value) return
  isAnimating.value = true

  const inner = innerRef.value
  const book = bookRef.value
  const cover = coverRef.value

  inner.classList.add('visible')

  const tl = gsap.timeline({
    onComplete: () => {
      isOpen.value = true
      isAnimating.value = false
    }
  })

  tl.to(cover, {
    rotateY: -170,
    duration: 1.2,
    ease: 'power2.inOut'
  }, 0)

  tl.to(book, {
    x: 24,
    duration: 1.2,
    ease: 'power2.inOut'
  }, 0)

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createParticle(window.innerWidth / 2, window.innerHeight / 2)
    }, i * 60)
  }
}

function onCoverHover() {
  if (!isOpen.value && !isAnimating.value) {
    gsap.to(coverRef.value, {
      rotateY: -12,
      duration: 0.4,
      ease: 'power2.out'
    })
  }
}

function onCoverLeave() {
  if (!isOpen.value && !isAnimating.value) {
    gsap.to(coverRef.value, {
      rotateY: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  }
}

function goHome() {
  if (!isOpen.value) return
  gsap.to(mainRef.value, {
    opacity: 0,
    scale: 1.1,
    duration: 0.8,
    onComplete: () => router.push('/home')
  })
}
</script>

<style>
.beian-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  font-size: 11px;
  color: rgba(168, 152, 138, 0.5);
  background: linear-gradient(to top, rgba(255,248,245,0.85) 0%, transparent 100%);
  pointer-events: auto;
}

.beian-footer a {
  color: rgba(168, 152, 138, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.beian-footer a:hover {
  color: rgba(142, 78, 33, 0.8);
}

.beian-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  opacity: 0.6;
}
</style>
