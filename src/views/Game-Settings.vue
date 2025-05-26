<script setup lang="ts">
import AddPlayer from '@/components/AddPlayer.vue'
import router from '@/router'
import { useSoloStore } from '@/stores/Solo-Store'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useSoloStore()
const route = useRoute()

const gameMode = route.path.includes('multi') ? 'multi' : 'solo'
const type = ref(gameMode === 'solo' ? 'Solo' : 'Multi')

// Set mode in store
store.isSolo = gameMode === 'solo'

// Initialize host on first mount if in multi mode
onMounted(() => {
  if (gameMode === 'multi') {
    store.clearStore()
    if (store.players.length === 0) {
      store.initHostPlayer('Host')
    }
  }
})

const isHost = computed(() => {
  return store.isSolo || store.currentPlayerId === store.hostId
})

const allPlayersReady = computed(() => {
  if (store.isSolo) return true
  return store.players.length >= 2 && store.players.every((p) => p.isReady)
})

const startGame = () => {
  if (!isHost.value) {
    alert('Only host can start the game.')
    return
  }

  if (!allPlayersReady.value) {
    alert('All players must be ready before starting.')
    return
  }

  store.startGame()

  if (gameMode === 'multi') {
    router.push({
      name: 'MultiRounds',
      params: { roomId: route.params.roomId },
    })
  } else {
    router.push({ name: 'SoloRounds' })
  }
}
</script>
<template>
  <section class="settings-page flex flex-col gap-2 w-full">
    <h2>{{ type }} Settings</h2>
    <UCard variant="soft">
      <AddPlayer
        :players="store.players"
        :isSolo="store.isSolo"
        :isHost="isHost"
        :gameMode="gameMode"
        :currentUserId="store.currentPlayerId"
        @add="store.addPlayer($event)"
        @update="store.updatePlayerName($event[0], $event[1])"
        @delete="store.removePlayer($event)"
        @readyToggle="store.togglePlayerReady($event)"
      />
      <div v-if="isHost" class="flex w-full flex-col gap-1 mt-[1rem]">
        <h3 for="scoreLimit">Winning Score</h3>
        <UInputNumber
          id="scoreLimit"
          v-model="store.scoreLimit"
          showButtons
          buttonLayout="horizontal"
          :step="5"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </UInputNumber>
      </div>
    </UCard>
    {{ isHost }}
    <UButton
      v-if="isHost"
      class="w-full justify-center"
      @click="startGame"
      variant="outline"
      size="xl"
      :disabled="store.players.length < 2 || !allPlayersReady"
    >
      START
    </UButton>
    <UButton
      class="w-full justify-center"
      color="error"
      @click="router.push('/')"
      variant="outline"
      size="xl"
    >
      BACK
    </UButton>
  </section>
</template>
<style scoped></style>
