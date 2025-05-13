import { useSoloStore } from '@/stores/Solo-Store'
import LandingView from '@/views/Landing-View.vue'
import GameRounds from '@/views/Game-Rounds.vue'
import { createRouter, createWebHistory } from 'vue-router'
import GameSettings from '@/views/Game-Settings.vue'
import { getGuid } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingView },
    {
      path: '/solo',
      children: [
        {
          path: '',
          name: 'SoloSettings',
          component: GameSettings,
        },
        {
          path: 'rounds',
          name: 'SoloRounds',
          component: GameRounds,
        },
      ],
    },
    {
      path: '/multi',
      redirect: () => ({
        name: 'MultiSettings',
        params: { roomId: getGuid() },
      }),
    },
    {
      path: '/multi/:roomId',
      children: [
        {
          path: '',
          name: 'MultiSettings',
          component: GameSettings,
        },
        {
          path: 'rounds',
          name: 'MultiRounds',
          component: GameRounds,
        },
      ],
    },
  ],
})
router.beforeEach(async (to, _from) => {
  const store = useSoloStore()
  if (!store.isGameStarted && to.name === 'SoloRounds') {
    return { name: 'SoloSettings' }
  }
})

export default router

