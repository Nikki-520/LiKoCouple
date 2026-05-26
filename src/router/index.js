import { createRouter, createWebHashHistory } from 'vue-router'
import UnlockView from '../views/UnlockView.vue'
import HomeView from '../views/HomeView.vue'
import DiaryView from '../views/DiaryView.vue'
import WishlistView from '../views/WishlistView.vue'
import MessagesView from '../views/MessagesView.vue'

const routes = [
  { path: '/', name: 'unlock', component: UnlockView },
  { path: '/home', name: 'home', component: HomeView },
  { path: '/diary', name: 'diary', component: DiaryView },
  { path: '/wishlist', name: 'wishlist', component: WishlistView },
  { path: '/messages', name: 'messages', component: MessagesView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
