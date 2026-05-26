import { reactive, computed } from 'vue'

const DEFAULT_AUTH = {
  personA: { name: '小刘', pass: '123456' },
  personB: { name: '小孔', pass: '123456' }
}

const auth = reactive({
  currentRole: null,
  currentName: '',
  personA: { ...DEFAULT_AUTH.personA },
  personB: { ...DEFAULT_AUTH.personB }
})

function loadAuth() {
  const session = sessionStorage.getItem('liko_session')
  if (session) {
    try {
      const s = JSON.parse(session)
      auth.currentRole = s.role
      auth.currentName = s.name
    } catch {}
  }
}

function login(role, password) {
  const person = role === 'A' ? auth.personA : auth.personB
  if (person.pass !== password) {
    return { success: false, msg: '再想想哦～' }
  }
  auth.currentRole = role
  auth.currentName = person.name
  sessionStorage.setItem('liko_session', JSON.stringify({ role, name: person.name }))
  return { success: true }
}

function logout() {
  auth.currentRole = null
  auth.currentName = ''
  sessionStorage.removeItem('liko_session')
}

const isLoggedIn = computed(() => auth.currentRole !== null)

loadAuth()

export function useAuth() {
  return {
    auth,
    isLoggedIn,
    login,
    logout
  }
}
