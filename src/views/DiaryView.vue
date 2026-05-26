<template>
  <div class="min-h-screen font-body-md overflow-x-hidden relative" style="background-color: #fff8f5; color: #1f1b18; background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAvlQSwXhutdP-mzcV8Uc6FSmGzze8-3FrinLv_7U6Ey5WcerF7abLa_RuqnDdscoVUNyE7bNwgX5a922B9QWd2jGJzBNIXjRN7Ri0wZYmLmsWtVnuGTICmFoL9y_r-C25jayK3p2gOM3uAyo3ZVAHeIPi-OWol3l9ink4axhi46W2mz5O-EK4MCDMIYKb7FR9xLuguldJfojwS46SVau2tHo44rwddjdN4DBq7gojdMHSsPF8rIEt2BmkdUcopke0nZwtsoqEaHKUd);">

    <AppBar @login="showLogin = true" />

    <main class="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-lg relative z-10">
      <section class="mb-xl">
        <div
          ref="scrapbookCardRef"
          class="bg-[#FFF5F0] border-2 border-outline-variant/30 rounded-xl p-md md:p-lg shadow-xl relative transition-all duration-500 overflow-hidden group"
          :class="{ 'crumble-animation': crumbling }"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
            <div class="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg border border-outline-variant/20 shadow-sm relative" style="overflow: visible;">
                <span class="material-symbols-outlined text-secondary">calendar_today</span>
                <div class="relative">
                  <input
                    v-model="form.date"
                    type="date"
                    class="diary-native-date bg-transparent border-none font-headline-md text-headline-md text-text-main focus:ring-0 focus:outline-none w-44 cursor-pointer"
                    style="color-scheme: light;"
                  />
                </div>
              </div>
            <div class="flex items-center gap-sm bg-white/30 px-4 py-2 rounded-full border border-white/50">
              <span class="text-xs font-label-md text-text-muted">今日心情:</span>
              <div class="flex gap-xs">
                <button
                  v-for="m in moods"
                  :key="m.emoji"
                  class="text-2xl transition-transform duration-300 outline-none cursor-pointer"
                  :style="{ filter: selectedMood === m.emoji ? 'none' : 'grayscale(1)', transform: selectedMood === m.emoji ? 'scale(1.5)' : 'scale(1)' }"
                  :title="m.label"
                  @click="selectMood(m.emoji, $event)"
                >{{ m.emoji }}</button>
              </div>
            </div>
          </div>

          <div
            class="relative p-2"
            style="min-height: 300px; background-image: linear-gradient(#d2c4bd 1px, transparent 1px); background-size: 100% 2.5rem;"
          >
            <textarea
              ref="textareaRef"
              v-model="form.content"
              class="w-full bg-transparent border-none resize-none font-body-lg text-body-lg text-text-main placeholder:text-text-muted/50 focus:ring-0 focus:outline-none focus-visible:outline-none"
              style="height: 280px; line-height: 2.5rem; padding: 0; cursor: text;"
              placeholder="今天发生了什么有趣的时刻？"
            ></textarea>
            <div class="absolute bottom-0 left-0 right-0 opacity-30 h-4" style="background: linear-gradient(to top, rgba(210,196,189,0.3) 0%, transparent 100%); pointer-events: none;"></div>
          </div>

          <div class="mt-lg flex flex-col sm:flex-row justify-between items-end gap-md">
            <div class="flex items-end gap-3">
              <label
                class="relative w-28 h-28 bg-white/40 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-primary-container/30 transition-colors"
                style="border: 2px dashed rgba(210, 196, 189, 0.6);"
              >
                <span class="material-symbols-outlined text-outline group-hover/upload:text-primary transition-colors">add_a_photo</span>
                <span class="text-[10px] font-label-md mt-1 text-outline">添加回忆</span>
                <input type="file" accept="image/*" multiple class="absolute inset-0 opacity-0 cursor-pointer" @change="onImageUpload" />
              </label>
              <div class="flex gap-2 flex-wrap">
                <div
                  v-for="(img, i) in form.images"
                  :key="i"
                  class="relative w-20 h-20 rounded-lg overflow-hidden group/img"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <button
                    class="absolute top-0.5 right-0.5 bg-ink-brown/60 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                    @click="form.images.splice(i, 1)"
                  >×</button>
                </div>
              </div>
            </div>
            <button
              class="bg-secondary-container text-on-secondary-container px-xl py-3 rounded-full font-label-md text-label-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              style="box-shadow: 0 4px 20px rgba(255,171,118,0.4);"
              @click="handleSaveClick"
            >
              <span class="material-symbols-outlined text-sm">auto_fix_high</span>
              保存回忆
            </button>
          </div>

          <div class="absolute -top-4 -right-4 w-12 h-12 text-secondary/10 pointer-events-none">
            <span class="material-symbols-outlined text-5xl" style="color: rgba(142,78,33,0.1);">cloud</span>
          </div>
        </div>
      </section>

      <!-- 时光印记列表 -->
      <section class="relative mt-20">
        <div class="flex items-center gap-4 mb-xl px-2">
          <h2 class="font-headline-lg text-headline-lg text-ink-brown">时光印记</h2>
          <div class="h-px flex-1" style="background: rgba(210,196,189,0.2);"></div>
        </div>
        <div class="relative pl-xs md:pl-md">
          <div
            class="absolute left-0 top-0 bottom-0"
            style="width: 3px; background-image: linear-gradient(to bottom, #d2c4bd 40%, transparent 40%); background-size: 3px 18px; background-repeat: repeat-y;"
          ></div>

          <div
            v-for="(entry, idx) in diaryList"
            :key="entry.id"
            class="relative mb-10 pl-8"
          >
            <div
              class="absolute z-10 rounded-full"
              style="left: -5px; top: 24px; width: 10px; height: 10px; background: #8e4e21; box-shadow: 0 0 0 4px white;"
            ></div>
            <div
              class="bg-white rounded-lg border shadow-sm hover:shadow-xl transition-all duration-500 relative"
              style="border-color: rgba(210,196,189,0.2); padding: 24px; transform: rotate(-1deg); padding-bottom: 36px;"
              :style="{ transform: idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }"
            >
              <div
                class="absolute z-10"
                :style="idx % 2 === 0
                  ? 'top: -12px; left: 33%; width: 64px; height: 24px; background: rgba(255,235,200,0.6); transform: rotate(-3deg);'
                  : 'top: -8px; left: 24px; width: 48px; height: 20px; background: rgba(255,235,200,0.5); transform: rotate(12deg);'"
              ></div>

              <div class="flex justify-between items-start mb-4">
                <div>
                  <span class="font-handwriting-lg text-secondary text-lg block">{{ entry.date }}</span>
                  <span class="text-xs text-text-muted font-label-md">{{ getWeekday(entry.date) }}</span>
                  <span v-if="entry.author" class="text-[10px] block mt-0.5" style="color: rgba(168,152,138,0.5);">{{ entry.author }}</span>
                </div>
                <span class="text-2xl filter drop-shadow-sm">{{ entry.mood }}</span>
              </div>
              <p class="text-text-main leading-relaxed mb-4 font-body-md italic" style="opacity: 0.9;">{{ entry.content }}</p>
              <div v-if="entry.images && entry.images.length" class="overflow-hidden rounded-md mb-4">
                <div class="flex gap-2 overflow-x-auto">
                  <img
                    v-for="(img, i) in entry.images"
                    :key="i"
                    :src="img"
                    class="object-cover rounded grayscale-[0.1] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    :style="entry.images.length > 1 ? 'height: 224px; min-width: 200px; flex: 1;' : 'width: 100%; height: 224px;'"
                    :alt="'回忆照片'"
                  />
                </div>
              </div>
              <div v-if="entry.tags && entry.tags.length" class="flex gap-2 flex-wrap">
                <span
                  v-for="(tag, i) in entry.tags"
                  :key="i"
                  class="px-3 py-1 rounded-full text-[10px] font-label-md uppercase tracking-wider"
                  :style="i % 2 === 0
                    ? 'background: #b7ecec; color: #002020;'
                    : 'background: #f8ddcf; color: #261810;'"
                ># {{ tag }}</span>
              </div>
            </div>
          </div>

          <div v-if="diaryList.length === 0" class="text-center py-20">
            <p class="text-text-muted font-body-lg opacity-50">还没有日记，写下一篇吧 ✨</p>
          </div>
        </div>
      </section>
    </main>

    <nav class="fixed bottom-0 w-full z-50 rounded-t-2xl bg-white/80 backdrop-blur-xl flex justify-around items-center h-20 px-xs pb-safe border-t border-primary-container md:hidden" style="box-shadow: 0 -10px 30px rgba(255,171,118,0.1);">
      <router-link to="/diary" class="flex flex-col items-center justify-center text-secondary">
        <span class="material-symbols-outlined text-3xl">auto_stories</span>
        <span class="font-label-md text-[10px]">时光</span>
      </router-link>
      <router-link to="/messages" class="flex flex-col items-center justify-center text-text-muted hover:text-secondary transition-colors">
        <span class="material-symbols-outlined text-3xl">forum</span>
        <span class="font-label-md text-[10px]">留言</span>
      </router-link>
      <router-link to="/wishlist" class="flex flex-col items-center justify-center text-text-muted hover:text-secondary transition-colors">
        <span class="material-symbols-outlined text-3xl">temp_preferences_custom</span>
        <span class="font-label-md text-[10px]">心愿</span>
      </router-link>
    </nav>

    <div ref="particleContainerRef" class="pointer-events-none fixed inset-0 z-0"></div>

    <LoginModal :visible="showLogin" @close="showLogin = false" @logged-in="onLoggedIn" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import AppBar from '../components/AppBar.vue'
import LoginModal from '../components/LoginModal.vue'
import { useStorage } from '../composables/useStorage'
import { useAuth } from '../composables/useAuth'

const { read, write } = useStorage()
const { auth, isLoggedIn } = useAuth()
const STORAGE_KEY = 'diary'

const showLogin = ref(false)
const scrapbookCardRef = ref(null)
const textareaRef = ref(null)
const particleContainerRef = ref(null)

const form = reactive({
  date: todayStr(),
  mood: '',
  content: '',
  images: [],
  tags: []
})

const selectedMood = ref('')
const crumbling = ref(false)

const moods = [
  { emoji: '😊', label: '开心' },
  { emoji: '😢', label: '难过' },
  { emoji: '😍', label: '恋爱' },
  { emoji: '😴', label: '困倦' }
]

function todayStr() {
  return formatDate(new Date())
}

function formatDate(d) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function nowId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function getWeekday(dateStr) {
  if (!dateStr) return ''
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return weekdays[d.getDay()]
}

const diaryList = ref([])

function loadDiaryList() {
  const data = read(STORAGE_KEY)
  diaryList.value = Array.isArray(data) ? data : []
}

function persistDiaryList() {
  write(STORAGE_KEY, diaryList.value)
}

function selectMood(emoji, event) {
  selectedMood.value = emoji
  form.mood = emoji
  const btn = event.currentTarget
  btn.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.8)' },
      { transform: 'scale(1.5)' }
    ],
    { duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }
  )
}

function onImageUpload(e) {
  const files = e.target.files
  if (!files.length) return
  for (const file of files) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.images.push(ev.target.result)
    }
    reader.readAsDataURL(file)
  }
  e.target.value = ''
}

function handleSaveClick() {
  if (!isLoggedIn.value) {
    showLogin.value = true
    return
  }
  saveDiary()
}

function onLoggedIn() {
  saveDiary()
}

function saveDiary() {
  if (!form.content.trim() && !form.mood) return
  if (!isLoggedIn.value) return

  crumbling.value = true
  burstParticles(30)

  const entry = {
    id: nowId(),
    date: form.date,
    mood: form.mood || '😊',
    content: form.content.trim(),
    images: [...form.images],
    tags: [],
    author: auth.currentName
  }

  setTimeout(() => {
    diaryList.value.unshift(entry)
    persistDiaryList()

    crumbling.value = false

    form.date = todayStr()
    form.mood = ''
    form.content = ''
    form.images = []
    selectedMood.value = ''

    nextTick(() => {
      const card = scrapbookCardRef.value
      if (card) {
        card.animate(
          [
            { transform: 'translateY(50px)', opacity: 0, filter: 'blur(10px)' },
            { transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' }
          ],
          { duration: 800, easing: 'ease-out' }
        )
      }
    })
  }, 850)
}

function burstParticles(count) {
  const container = particleContainerRef.value
  const card = scrapbookCardRef.value
  if (!container || !card) return
  const symbols = ['favorite', 'sparkles', 'stars', 'cloud']
  const rect = card.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span')
    span.className = 'material-symbols-outlined absolute transition-opacity'
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)]
    span.style.fontSize = (Math.random() * 20 + 10) + 'px'
    span.style.left = cx + 'px'
    span.style.top = cy + 'px'
    span.style.color = 'rgba(142,78,33,0.4)'
    const angle = Math.random() * Math.PI * 2
    const dist = 100 + Math.random() * 200
    span.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      { duration: 1000 + Math.random() * 500, easing: 'ease-out' }
    )
    container.appendChild(span)
    setTimeout(() => span.remove(), 2000)
  }
}

function spawnAtmosphereParticle() {
  const container = particleContainerRef.value
  if (!container) return
  const symbols = ['favorite', 'sparkles', 'stars', 'cloud']
  const span = document.createElement('span')
  span.className = 'material-symbols-outlined absolute transition-opacity'
  span.textContent = symbols[Math.floor(Math.random() * symbols.length)]
  span.style.fontSize = (Math.random() * 20 + 10) + 'px'
  span.style.left = Math.random() * 100 + 'vw'
  span.style.top = '110vh'
  span.style.color = 'rgba(142,78,33,0.1)'
  const duration = 15000 + Math.random() * 15000
  span.animate(
    [
      { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
      { transform: 'translateY(-120vh) rotate(360deg)', opacity: 0.3, offset: 0.5 },
      { transform: 'translateY(-140vh) rotate(720deg)', opacity: 0 }
    ],
    { duration, iterations: Infinity }
  )
  container.appendChild(span)
}

onMounted(() => {
  loadDiaryList()
  for (let i = 0; i < 12; i++) {
    setTimeout(spawnAtmosphereParticle, i * 800)
  }
})
</script>

<style>
@keyframes crumble {
  0% { transform: scale(1) rotate(0); opacity: 1; filter: blur(0); }
  50% { transform: scale(0.5) rotate(15deg) skew(10deg); opacity: 0.7; filter: blur(4px); }
  100% { transform: scale(0) rotate(90deg); opacity: 0; filter: blur(20px); }
}

.crumble-animation {
  animation: crumble 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.diary-native-date::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  filter: invert(0.4);
  transition: opacity 0.2s;
  padding-left: 4px;
}

.diary-native-date::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
