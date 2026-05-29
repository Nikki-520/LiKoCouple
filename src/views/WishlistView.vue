<template>
  <div class="wishlist-page min-h-screen relative">
    <div class="absolute inset-0 z-0 paper-grain"></div>
    <div class="absolute inset-0 z-0" style="background-image: radial-gradient(#f5d6c6 0.5px, transparent 0.5px); background-size: 24px 24px; opacity: 0.6;"></div>

    <AppBar @login="showLogin = true" />

    <main class="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-32 relative z-10">
      <section class="mb-xl text-center">
        <h1 class="font-display-lg text-display-lg text-ink-brown mb-xs">愿望墙</h1>
        <p class="font-body-lg text-body-lg text-text-muted">我们的每一个小小梦想，都值得被挂起来，一起去实现。</p>
      </section>

      <div class="relative min-h-[400px] mb-xl" :class="{ 'blur-sm pointer-events-none select-none': !isLoggedIn }">
        <div class="washing-line"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-lg pt-12" id="active-wishes">
          <div
            v-for="(wish, index) in activeWishes"
            :key="wish.id"
            class="wish-card-wrapper relative pt-6 group"
            @click="handleWishClick"
          >
            <div class="peg absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-4 h-8 bg-[#D2B48C] rounded-sm shadow-sm"></div>
            <div
              class="wish-card swinging-card paper-grain bg-surface-container-low p-md rounded-lg shadow-peach/15 shadow-md border-outline-variant/20 border transition-all hover:scale-105 hover:z-30"
              :style="{ animationDelay: (-(index * 0.5 % 4) + 0.1) + 's' }"
            >
              <button
                class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 hover:bg-error/10 text-text-muted hover:text-error flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-sm z-10"
                title="删除愿望"
                @click.stop="confirmDelete(wish)"
              >×</button>
              <div class="stamp top-4 right-4" :class="{ 'stamped-visible': isCompleting(wish.id) }">已实现</div>
              <h3 class="font-headline-md text-headline-md text-ink-brown mb-xs pr-6">{{ wish.title }}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant">{{ wish.desc || '还没有描述呢~' }}</p>
              <div class="mt-md flex justify-between items-end">
                <span v-if="wish.author" class="text-[10px] text-text-muted/40 italic">{{ wish.author }}</span>
                <span v-else class="text-[10px] text-text-muted/20 italic"></span>
                <button
                  class="material-symbols-outlined text-secondary-container hover:text-secondary hover:scale-125 transition-all text-xl cursor-pointer"
                  title="实现愿望"
                  @click.stop="confirmComplete(wish, $event)"
                >auto_fix_high</button>
              </div>
            </div>
          </div>

          <div class="relative pt-6">
            <div
              class="wish-card bg-primary-container/30 border-2 border-dashed border-secondary-container p-md rounded-lg flex flex-col items-center justify-center min-h-[180px] group hover:bg-primary-container/50 transition-colors cursor-pointer"
              @click="handleAddClick"
            >
              <span class="material-symbols-outlined text-display-lg text-secondary-container group-hover:scale-110 transition-transform">add_notes</span>
              <span class="font-label-md text-label-md text-secondary mt-xs">添加新愿望</span>
            </div>
          </div>
        </div>
      </div>

      <Transition name="modal">
        <div v-if="showForm" class="fixed inset-0 z-[100] flex items-center justify-center bg-on-background/20 backdrop-blur-sm p-margin-mobile" @click.self="toggleForm">
          <div class="bg-surface-container-lowest paper-grain p-lg rounded-xl shadow-xl max-w-md w-full relative -rotate-1">
            <button class="absolute top-4 right-4 text-text-muted hover:text-ink-brown" @click="toggleForm">
              <span class="material-symbols-outlined">close</span>
            </button>
            <h2 class="font-headline-lg text-headline-lg text-ink-brown mb-md">写下我们的心愿</h2>
            <div class="space-y-md">
              <div>
                <label class="block font-label-md text-label-md text-text-muted mb-xs">愿望名称</label>
                <input
                  v-model="newTitle"
                  class="w-full bg-transparent border-b-2 border-outline-variant focus:border-secondary-container focus:ring-0 focus:outline-none font-handwriting-lg text-handwriting-lg outline-none py-xs transition-colors"
                  placeholder="例如：去看一场演唱会"
                  type="text"
                  @keyup.enter="addNewWish"
                />
              </div>
              <div>
                <label class="block font-label-md text-label-md text-text-muted mb-xs">悄悄话</label>
                <textarea
                  v-model="newDesc"
                  class="w-full bg-transparent border-b-2 border-outline-variant focus:border-secondary-container focus:ring-0 focus:outline-none font-body-md text-body-md outline-none py-xs transition-colors resize-none"
                  placeholder="想和你说的话..."
                  rows="3"
                ></textarea>
              </div>
              <button
                class="w-full bg-secondary-container text-white py-md rounded-full font-headline-md hover:shadow-lg hover:shadow-peach transition-all transform active:scale-95"
                @click="addNewWish"
              >挂上愿望墙</button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="modal">
        <div v-if="deleteConfirm" class="fixed inset-0 z-[110] flex items-center justify-center bg-on-background/30 backdrop-blur-sm p-margin-mobile" @click.self="deleteConfirm = null">
          <div class="bg-surface p-lg rounded-xl shadow-xl max-w-sm w-full text-center">
            <p class="font-body-lg text-ink-brown mb-md">确定要移除「{{ deleteConfirm.title }}」吗？</p>
            <div class="flex gap-sm justify-center">
              <button class="bg-error text-white px-lg py-sm rounded-full font-label-md hover:scale-105 transition-all" @click="doDelete">删除</button>
              <button class="bg-surface-container text-text-muted px-lg py-sm rounded-full font-label-md hover:scale-105 transition-all" @click="deleteConfirm = null">取消</button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="modal">
        <div v-if="completeConfirm" class="fixed inset-0 z-[110] flex items-center justify-center bg-on-background/30 backdrop-blur-sm p-margin-mobile" @click.self="completeConfirm = null">
          <div class="bg-surface p-lg rounded-xl shadow-xl max-w-sm w-full text-center">
            <p class="font-body-lg text-ink-brown mb-md">「{{ completeConfirm.title }}」已经实现了吗？</p>
            <div class="flex gap-sm justify-center">
              <button class="bg-secondary-container text-white px-lg py-sm rounded-full font-label-md hover:scale-105 transition-all" @click="doComplete">实现了！</button>
              <button class="bg-surface-container text-text-muted px-lg py-sm rounded-full font-label-md hover:scale-105 transition-all" @click="completeConfirm = null">再等等</button>
            </div>
          </div>
        </div>
      </Transition>

      <section v-if="archivedWishes.length" class="mt-xl" :class="{ 'blur-sm pointer-events-none select-none': !isLoggedIn }">
        <div class="flex items-center gap-xs mb-lg">
          <span class="material-symbols-outlined text-secondary">inventory_2</span>
          <h2 class="font-headline-lg text-headline-lg text-ink-brown">已实现的梦想</h2>
          <div class="flex-grow h-[2px] bg-outline-variant opacity-20 ml-md"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md" id="archived-wishes">
          <div
            v-for="wish in archivedWishes"
            :key="wish.id"
            class="stamped archived-item bg-surface-container/50 border border-outline-variant/30 p-md rounded-lg flex items-center gap-md opacity-80"
          >
            <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
              <span class="material-symbols-outlined">done_all</span>
            </div>
            <div>
              <h4 class="font-label-md text-label-md text-ink-brown">{{ wish.title }}</h4>
              <p class="text-xs text-text-muted">实现于 {{ wish.date }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="md:hidden bg-surface-container-low/90 backdrop-blur-xl fixed bottom-0 w-full z-50 rounded-t-xl shadow-lg flex justify-around items-center h-16 px-xs pb-safe border-t border-outline-variant/30">
      <router-link to="/home" class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">auto_stories</span>
        <span class="font-label-md text-[10px]">时光</span>
      </router-link>
      <router-link to="/messages" class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">forum</span>
        <span class="font-label-md text-[10px]">留言</span>
      </router-link>
      <router-link to="/wishlist" class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-all">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">temp_preferences_custom</span>
        <span class="font-label-md text-[10px]">心愿</span>
      </router-link>
    </footer>

    <LoginModal :visible="showLogin" @close="showLogin = false" @logged-in="onLoggedIn" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppBar from '../components/AppBar.vue'
import LoginModal from '../components/LoginModal.vue'
import { useAuth } from '../composables/useAuth'

const { auth, isLoggedIn } = useAuth()

const showLogin = ref(false)
const showForm = ref(false)
const newTitle = ref('')
const newDesc = ref('')
const wishes = ref([])
const completingIds = ref(new Set())
const deleteConfirm = ref(null)
const completeConfirm = ref(null)
const needSave = ref(false)

const STORAGE_KEY = 'liKo_wishlist'

const activeWishes = computed(() => wishes.value.filter(w => !w.done))
const archivedWishes = computed(() => wishes.value.filter(w => w.done))

function isCompleting(id) {
  return completingIds.value.has(id)
}

function loadWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      wishes.value = JSON.parse(raw)
      return
    }
  } catch {}
  wishes.value = [
    { id: 1, title: '去大理看洱海', desc: '想和你在洱海边骑自行车，吹吹风，什么都不做。', done: false, date: '', author: '小孔' },
    { id: 2, title: '拼完3000块乐高', desc: '那个巨大的霍格沃茨城堡，一定要和你一起完成。', done: false, date: '', author: '小刘' },
    { id: 3, title: '学做提拉米苏', desc: '你说你最喜欢吃提拉米苏，我想为你亲手做一个。', done: false, date: '', author: '小孔' }
  ]
}

function saveWishes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes.value))
}

function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) {
    newTitle.value = ''
    newDesc.value = ''
  }
}

function handleAddClick() {
  if (!isLoggedIn.value) {
    showLogin.value = true
    needSave.value = false
    return
  }
  toggleForm()
}

function handleWishClick() {
  if (!isLoggedIn.value) {
    showLogin.value = true
  }
}

function onLoggedIn() {
  if (needSave.value) return
}

function addNewWish() {
  const title = newTitle.value.trim()
  if (!title) return

  const newId = Math.max(0, ...wishes.value.map(w => w.id)) + 1
  const newWish = {
    id: newId,
    title,
    desc: newDesc.value.trim(),
    done: false,
    date: '',
    author: auth.currentName
  }
  wishes.value.push(newWish)
  saveWishes()

  newTitle.value = ''
  newDesc.value = ''
  showForm.value = false
}

function confirmDelete(wish) {
  deleteConfirm.value = wish
}

function doDelete() {
  const wish = deleteConfirm.value
  if (!wish) return
  const idx = wishes.value.findIndex(w => w.id === wish.id)
  if (idx !== -1) {
    wishes.value.splice(idx, 1)
    saveWishes()
  }
  deleteConfirm.value = null
}

function confirmComplete(wish, event) {
  if (wish.done || completingIds.value.has(wish.id)) return
  completeConfirm.value = wish
}

function doComplete() {
  const wish = completeConfirm.value
  if (!wish) return
  completeConfirm.value = null

  const el = document.querySelector(`.wish-card-wrapper`)
  if (el) {
    const rect = el.getBoundingClientRect()
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2)
  } else {
    createParticles(window.innerWidth / 2, window.innerHeight / 2)
  }

  const next = new Set(completingIds.value)
  next.add(wish.id)
  completingIds.value = next

  setTimeout(() => {
    wish.done = true
    const now = new Date()
    wish.date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`
    saveWishes()

    const next2 = new Set(completingIds.value)
    next2.delete(wish.id)
    completingIds.value = next2
  }, 1000)
}

function createParticles(x, y) {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div')
    p.className = 'particle material-symbols-outlined'
    p.textContent = 'sparkles'
    p.style.left = x + 'px'
    p.style.top = y + 'px'
    p.style.fontSize = Math.random() * 20 + 10 + 'px'
    p.style.color = '#ffab76'
    document.body.appendChild(p)

    requestAnimationFrame(() => {
      p.style.transition = `all ${Math.random() * 1 + 0.5}s ease-out`
      p.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px) rotate(${Math.random() * 360}deg)`
      p.style.opacity = '0'
    })

    setTimeout(() => p.remove(), 2000)
  }
}

onMounted(() => {
  loadWishes()
})
</script>

<style scoped>
.wishlist-page {
  background-color: #fff8f5;
  background-image: linear-gradient(to bottom, #fff8f5, #fcf2ed);
  overflow-x: hidden;
}

.paper-grain::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBPt9fhVOFipMphd9u3-w4931yU8TLugR7o4CmYQv7Ybb8vkdusQ7H2eGI56J0I1R0PdkwX0woO89j-JxtDWyMHAgAvdSUhrxxJvqw-_EYToDOe4ky2llfEHnXceEXYyS9NdzAqLYTMNJpII9q-pFMxvYtDz9nmBimQ_7J57reKBVrL1wdShpbh5w8KLEwPIZRU2igGtZRoO6gvGplbhSOUV4IU6LuXefUzwNlkCKhLY4wAtyKngpPcg8ffEWxZkd6Xx8ciL6kbgnSn);
  opacity: 0.05;
  pointer-events: none;
  z-index: 10;
}

@keyframes swing {
  0% { transform: rotate(-1deg); }
  50% { transform: rotate(1.5deg); }
  100% { transform: rotate(-1deg); }
}

.swinging-card {
  animation: swing 4s ease-in-out infinite;
  transform-origin: top center;
}

.washing-line {
  background: repeating-linear-gradient(90deg, #80756f, #80756f 2px, transparent 2px, transparent 10px);
  height: 2px;
  width: 110%;
  left: -5%;
  top: 40px;
  position: absolute;
  opacity: 0.4;
}

.stamp {
  position: absolute;
  border: 3px solid #ba1a1a;
  color: #ba1a1a;
  padding: 4px 8px;
  font-weight: 900;
  text-transform: uppercase;
  border-radius: 4px;
  transform: rotate(-15deg);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
}

.wish-card {
  position: relative;
}

.wish-card .stamped-visible {
  opacity: 0.8;
  scale: 1.2;
}

.particle {
  position: fixed;
  pointer-events: none;
  z-index: 100;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-enter-from > div {
  transform: scale(0.9) rotate(1deg);
}

.modal-leave-to > div {
  transform: scale(0.9) rotate(-1deg);
}

.archived-item {
  filter: grayscale(0.4) opacity(0.7);
}
</style>
