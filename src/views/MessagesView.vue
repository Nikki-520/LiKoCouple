<template>
  <div class="min-h-screen relative">
    <AppBar @login="showLogin = true" />

    <main class="cork-texture min-h-[calc(100vh-64px)] p-margin-mobile md:p-margin-desktop relative overflow-hidden">
      <div class="relative z-10 mb-xl flex flex-col md:flex-row justify-between items-end gap-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-ink-brown mb-xs">我们的秘密角落</h1>
          <p class="text-text-muted font-body-md">每一个字都是心跳的回响...</p>
        </div>
        <button
          class="bg-secondary-container text-on-secondary-container px-lg py-sm rounded-full font-label-md flex items-center gap-xs shadow-lg hover:scale-105 transition-all"
          @click="handleCompose"
        >
          <span class="material-symbols-outlined">edit</span>
          新留言
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xl relative z-10 pb-xl">
        <template v-for="(msg, index) in messages" :key="msg.id">
          <div
            v-if="shouldShowEnvelope(msg, index)"
            class="group relative cursor-pointer env-wrap h-48 flex items-center justify-center transition-transform hover:rotate-1"
            :class="{ 'env-open': msg._opened }"
            @click="openEnvelope(index)"
          >
            <div class="absolute inset-0 bg-primary-container/80 rounded-lg shadow-md -rotate-2"></div>
            <div
              class="relative w-56 h-36 bg-surface-container-lowest border-2 rounded-sm overflow-hidden"
              :class="msg.read ? 'border-outline-variant shadow-md' : 'border-primary-fixed-dim shadow-xl unread-glow'"
            >
              <div
                v-if="!msg.read"
                class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <span class="material-symbols-outlined text-secondary scale-150">favorite</span>
              </div>
              <span v-else class="absolute inset-0 flex items-center justify-center material-symbols-outlined text-text-muted opacity-30 z-10 pointer-events-none">mail_outline</span>
              <div
                class="env-letter absolute bottom-0 left-3 right-3 bg-white px-3 pt-3 pb-2 z-20"
              >
                <p class="text-ink-brown text-xs leading-relaxed">{{ msg.content }}</p>
                <p class="text-right text-[10px] text-text-muted mt-1">— {{ msg.from }}</p>
              </div>
              <div
                class="env-flap absolute top-0 left-0 w-full h-full z-30 origin-top"
                :class="msg.read ? 'bg-surface-variant border-b-2 border-outline-variant' : 'bg-primary-fixed border-b-2 border-primary-fixed-dim'"
              ></div>
            </div>
            <div
              v-if="!msg.read"
              class="absolute -top-4 -right-2 bg-error text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold z-40"
            >New</div>
          </div>

          <div
            v-else
            class="note-curl relative p-md shadow-sm border flex flex-col justify-between transition-all duration-300"
            :class="noteColors[index % noteColors.length]"
            :style="{ transform: `rotate(${noteRotations[index % noteRotations.length]}deg)` }"
          >
            <div
              class="absolute -top-3 left-1/2 -translate-x-1/2 h-6 blur-[1px]"
              :class="tapeStyles[index % tapeStyles.length]"
            ></div>
            <div class="font-body-md" :class="noteTextColors[index % noteTextColors.length]">
              <span class="material-symbols-outlined text-xs align-middle">push_pin</span>
              {{ msg.content }}
            </div>
            <div class="flex justify-between items-end mt-2">
              <span class="text-[10px] text-text-muted/60">{{ msg.from }}</span>
              <span class="text-text-muted text-xs">{{ msg.date }}</span>
            </div>
          </div>
        </template>
      </div>

      <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-1/4 left-10 text-primary-container/20 animate-bounce" style="animation-duration: 5s;">
          <span class="material-symbols-outlined text-6xl">favorite</span>
        </div>
        <div class="absolute bottom-1/4 right-20 text-tertiary-container/20 animate-pulse" style="animation-duration: 8s;">
          <span class="material-symbols-outlined text-8xl">colors_spark</span>
        </div>
        <div class="absolute top-2/3 left-1/3 text-secondary-container/15 animate-bounce" style="animation-duration: 7s; animation-delay: 2s;">
          <span class="material-symbols-outlined text-5xl">auto_awesome</span>
        </div>
      </div>
    </main>

    <div class="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-low/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-peach/20 shadow-lg flex justify-around items-center h-16 px-xs pb-safe">
      <router-link to="/home" class="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
        <span class="material-symbols-outlined">auto_stories</span>
        <span class="font-label-md text-[10px]">时光</span>
      </router-link>
      <router-link to="/messages" class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-all">
        <span class="material-symbols-outlined">forum</span>
        <span class="font-label-md text-[10px]">留言</span>
      </router-link>
      <router-link to="/wishlist" class="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
        <span class="material-symbols-outlined">temp_preferences_custom</span>
        <span class="font-label-md text-[10px]">心愿</span>
      </router-link>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="composeOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-margin-mobile">
          <div class="absolute inset-0 bg-ink-brown/40 backdrop-blur-sm" @click="closeCompose"></div>
          <div class="relative bg-white w-full max-w-md rounded-2xl p-lg shadow-2xl border-4 border-primary-container overflow-hidden">
            <div class="space-y-md" :class="{ 'sending-meteor': sending }">
              <div class="flex justify-between items-center mb-md">
                <h3 class="font-headline-md text-secondary">写给心爱的 {{ recipientName }}</h3>
                <button class="text-text-muted" @click="closeCompose"><span class="material-symbols-outlined">close</span></button>
              </div>
              <div class="space-y-sm">
                <label class="block text-sm font-label-md text-on-surface-variant">信件内容</label>
                <textarea
                  v-model="letterContent"
                  class="w-full bg-surface-container border-none rounded-xl p-sm text-ink-brown focus:ring-2 focus:ring-secondary-container focus:outline-none resize-none"
                  placeholder="在这里写下你的真心话..."
                  rows="5"
                ></textarea>
              </div>
              <div class="flex gap-md pt-md">
                <button
                  class="flex-1 bg-secondary-container text-on-secondary-container py-md rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-xs"
                  @click="sendLetter"
                >
                  <span>放飞信封</span>
                  <span class="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
            <Transition name="fade">
              <div
                v-if="sent"
                class="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-lg"
              >
                <span class="material-symbols-outlined text-secondary-container text-6xl animate-bounce">auto_awesome</span>
                <h3 class="font-headline-md text-ink-brown mt-md">发送成功!</h3>
                <p class="text-text-muted mt-xs">你的心意已经化作星辰飞向看板啦</p>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>

    <LoginModal :visible="showLogin" @close="showLogin = false" @logged-in="loggedIn = true" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import AppBar from '../components/AppBar.vue'
import LoginModal from '../components/LoginModal.vue'
import { useStorage } from '../composables/useStorage'
import { useAuth } from '../composables/useAuth'

const { read, write } = useStorage()
const { auth, isLoggedIn } = useAuth()

const showLogin = ref(false)
const loggedIn = ref(false)

const composeOpen = ref(false)
const sending = ref(false)
const sent = ref(false)
const letterContent = ref('')

const currentRole = computed(() => auth.currentRole)
const currentName = computed(() => auth.currentName)
const recipientName = computed(() => currentRole.value === 'A' ? '小孔' : '小刘')

const noteColors = [
  'bg-[#fffdf0] border-[#f5e6d3]',
  'bg-[#f0f9f9] border-[#d6ebeb]',
  'bg-[#fff5f5] border-[#fce4e4]',
  'bg-[#fdf8f0] border-[#f0e0cc]',
  'bg-[#f5f0ff] border-[#e0d6f0]'
]

const noteTextColors = [
  'text-ink-brown',
  'text-tertiary',
  'text-on-secondary-container',
  'text-on-primary-container',
  'text-primary'
]

const noteRotations = [2, -1, 3, -3, 1, -2, 4, -4]

const tapeStyles = [
  'w-12 bg-primary-container/40 rotate-1',
  'w-10 left-1/3 bg-tertiary-container/30 -rotate-3',
  'w-14 bg-secondary-fixed/50 rotate-2',
  'w-8 right-1/4 bg-error/10 -rotate-1'
]

const messages = reactive([
  { id: 1, from: '小孔', to: 'Li', content: '今天夕阳好美，想和你一起看。', read: false, date: '2023.10.25', _opened: false },
  { id: 2, from: '小刘', to: 'Ko', content: '那个八音盒修好啦，晚上听听看？', read: false, date: '2023.10.23', _opened: false },
  { id: 3, from: '小孔', to: 'Li', content: '记得下周三的纪念日晚餐，我已经订好位置啦！', read: true, date: '2023.10.24' },
  { id: 4, from: '小刘', to: 'Ko', content: '今天面试加油！你是最棒的 ✨ 抱抱~', read: true, date: '2023.10.22' },
  { id: 5, from: '小孔', to: 'Li', content: '📍 一起去喂流浪猫\n📍 拼完那副500块的拼图\n📍 买新的薄荷盆栽', read: true, date: '2023.10.20' }
])

function shouldShowEnvelope(msg, index) {
  if (!isLoggedIn.value) {
    return true
  }
  if (!currentName.value) {
    return !msg.read || index < 2
  }
  if (msg.from === currentName.value) {
    return false
  }
  return true
}

onMounted(() => {
  const stored = read('messages')
  if (stored && Array.isArray(stored) && stored.length) {
    messages.splice(0, messages.length, ...stored.map(m => ({
      ...m,
      _opened: m.read
    })))
  }
})

function syncStorage() {
  const plain = messages.map(({ _opened, ...rest }) => ({ ...rest }))
  write('messages', plain)
}

function openEnvelope(index) {
  if (!isLoggedIn.value) {
    showLogin.value = true
    return
  }
  const msg = messages[index]
  if (!msg) return
  msg._opened = !msg._opened
  if (!msg.read) {
    msg.read = true
    syncStorage()
  }
}

function handleCompose() {
  if (!isLoggedIn.value) {
    showLogin.value = true
    return
  }
  composeOpen.value = true
  sending.value = false
  sent.value = false
  letterContent.value = ''
}

function closeCompose() {
  composeOpen.value = false
  sending.value = false
  sent.value = false
}

function sendLetter() {
  if (!letterContent.value.trim()) return
  sending.value = true

  setTimeout(() => {
    sent.value = true
    const now = new Date()
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
    const newMsg = {
      id: Date.now(),
      from: currentName.value,
      to: currentRole.value === 'A' ? 'B' : 'A',
      content: letterContent.value.trim(),
      read: false,
      date: dateStr
    }
    messages.unshift({ ...newMsg, _opened: false })
    syncStorage()

    setTimeout(() => {
      closeCompose()
    }, 2000)
  }, 800)
}
</script>

<style scoped>
.cork-texture {
  background-color: #f6ece7;
  background-image: radial-gradient(circle at 2px 2px, rgba(142, 78, 33, 0.05) 1px, transparent 0);
  background-size: 24px 24px;
  position: relative;
}

.cork-texture::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuClPamNlGntDgxpDaYuaPS4Jz7t3bf2rUpeN0d3CvMtO6uTuglSnM_3qZIjkUhoO9cZrhdpINbFDCFCv1-An__qb71hJX9hNDOSCCINKG9nvvaQ4gDO6-wXHcvs2VgBvncr9RtumkIxKA7yGdAuTcRmcjE-EbIX3a_3GJOQL73lAqAHBs6USLSBYGbinwMjZirgNqMWeb4NE02vtALjHUTWpoCbLyUaTPLmmX1_6HUPkpcCQHuSNgZXUQ7VANsp_rchvDRPogWjIwpQ);
  opacity: 0.1;
  z-index: 0;
}

.note-curl:hover {
  transform: rotate(-1deg) scale(1.02) !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.note-curl::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0;
  border-color: transparent transparent #d2c4bd transparent;
  transition: all 0.3s ease;
}

.note-curl:hover::before {
  border-width: 0 0 20px 20px;
}

@keyframes breathe {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 171, 118, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 171, 118, 0.6); transform: scale(1.02); }
}

.unread-glow {
  animation: breathe 3s infinite ease-in-out;
}

.env-wrap {
  perspective: 1000px;
}

.env-flap {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.env-open .env-flap {
  transform: rotateX(180deg);
  z-index: 0;
}

@keyframes meteor-fly {
  0% { transform: scale(1) translate(0, 0); opacity: 1; }
  20% { transform: scale(1.1) translate(10px, -10px); }
  100% { transform: scale(0) translate(500px, -800px); opacity: 0; }
}

.sending-meteor {
  animation: meteor-fly 1s forwards ease-in;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > :nth-child(2),
.modal-leave-active > :nth-child(2) {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-enter-from > :nth-child(2) {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to > :nth-child(2) {
  transform: scale(0.9) translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
