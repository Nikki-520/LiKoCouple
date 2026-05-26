<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="fixed inset-0 z-[200] flex items-center justify-center" @click.self="close">
        <div class="absolute inset-0 bg-ink-brown/20 backdrop-blur-sm"></div>
        <div class="relative bg-surface/90 backdrop-blur-md p-lg md:p-xl rounded-[24px] w-[420px] max-w-[90vw] shadow-lg text-center z-10">
          <h2 class="font-headline-lg text-headline-lg text-ink-brown mb-md">选择你的身份</h2>
          <div class="flex gap-sm justify-center mb-lg">
            <div
              class="flex-1 bg-surface-container-low p-md rounded-xl cursor-pointer hover:scale-105 transition-all border-2"
              :class="selectedRole === 'A' ? 'border-secondary-container' : 'border-transparent'"
              @click="selectRole('A')"
            >
              <span class="material-symbols-outlined text-4xl text-secondary-container block mb-xs">face</span>
              <p class="font-label-md text-ink-brown">{{ auth.personA.name }}</p>
            </div>
            <div
              class="flex-1 bg-surface-container-low p-md rounded-xl cursor-pointer hover:scale-105 transition-all border-2"
              :class="selectedRole === 'B' ? 'border-secondary-container' : 'border-transparent'"
              @click="selectRole('B')"
            >
              <span class="material-symbols-outlined text-4xl text-secondary-container block mb-xs">face_3</span>
              <p class="font-label-md text-ink-brown">{{ auth.personB.name }}</p>
            </div>
          </div>
          <div v-if="selectedRole" class="space-y-sm mb-lg">
            <input
              v-model="inputPass"
              type="password"
              placeholder="输入密码"
              class="w-full bg-transparent border-b-2 border-outline-variant focus:border-secondary-container outline-none px-xs py-sm font-body-md text-ink-brown text-center transition-colors"
              :class="{ 'animate-shake': shake }"
              @keyup.enter="doLogin"
            />
            <p v-if="errorMsg" class="text-error font-label-md text-label-md">{{ errorMsg }}</p>
          </div>
          <div class="flex gap-sm justify-center">
            <button
              v-if="selectedRole"
              class="bg-secondary-container text-white px-lg py-sm rounded-full font-label-md text-label-md hover:scale-110 transition-transform shadow-lg shadow-peach/30"
              @click="doLogin"
            >登录</button>
            <button
              class="bg-surface-container text-text-muted px-lg py-sm rounded-full font-label-md text-label-md hover:scale-105 transition-transform"
              @click="close"
            >取消</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['close', 'loggedIn'])

const { auth, login } = useAuth()

const selectedRole = ref(null)
const inputPass = ref('')
const errorMsg = ref('')
const shake = ref(false)

watch(() => props.visible, (v) => {
  if (v) {
    selectedRole.value = null
    inputPass.value = ''
    errorMsg.value = ''
  }
})

function selectRole(role) {
  selectedRole.value = role
  inputPass.value = ''
  errorMsg.value = ''
}

function doLogin() {
  const result = login(selectedRole.value, inputPass.value.trim())
  if (result.success) {
    emit('loggedIn')
    close()
  } else {
    errorMsg.value = result.msg
    shake.value = true
    setTimeout(() => shake.value = false, 600)
  }
}

function close() {
  emit('close')
}
</script>

<style scoped>
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
  transform: scale(0.9);
}
.modal-leave-to > :nth-child(2) {
  transform: scale(0.9);
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
  75% { transform: translateX(-4px); }
}
.animate-shake {
  animation: shake 0.4s ease;
}
</style>
