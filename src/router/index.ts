import { useSoloStore } from '@/stores/Solo-Store'
import HomeView from '@/views/HomeView.vue'
import MultiView from '@/views/MultiView.vue'
import SoloRounds from '@/views/Solo-Rounds.vue'
import SoloSettings from '@/views/Solo-Settings.vue'
import SoloView from '@/views/SoloView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/solo',
      component: SoloView,
      redirect: { name: 'SoloSettings' },
      children: [
        {
          path: 'settings',
          name: 'SoloSettings',
          component: SoloSettings,
        },
        {
          path: 'rounds',
          name: 'SoloRounds',
          component: SoloRounds,
        },
      ],
    },
    { path: '/multi', component: MultiView },
  ],
})

router.beforeEach(async (to, _from) => {
  const store = useSoloStore()
  if (!store.isGameStarted && to.name === 'SoloRounds') {
    return { name: 'SoloSettings' }
  }
})

export default router
