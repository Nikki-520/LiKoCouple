import { reactive } from 'vue'

const STORAGE_PREFIX = 'liko_'

function read(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function remove(key) {
  localStorage.removeItem(STORAGE_PREFIX + key)
}

export function useStorage() {
  return { read, write, remove }
}
