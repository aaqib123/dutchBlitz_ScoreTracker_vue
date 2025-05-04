<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store'
import SoloRoundView from '@/components/SoloRoundInput.vue'
import router from '@/router'
import RoundCard from '@/components/RoundCard.vue'
import ScoreCard from '@/components/ScoreCard.vue'
import { computed, ref } from 'vue'

const store = useSoloStore()
const isDrawerOpen = ref(false)
const playerScores = ref(store.players)
const setModalClosed = ref(true)
const modalOpen = computed(() => store.didWin && setModalClosed)

function closeGame() {
  store.endGame()
  router.push({ name: 'SoloSettings' })
}

function closeModal() {
  setModalClosed.value = false
}
</script>
<template>
  <UModal :open="modalOpen" :close="true">
    <template #content>
      <h3 class="p-3">We have a Winner!</h3>
      <div class="flex flex-col gap-2 p-3">
        <div v-for="(player, index) in playerScores" :key="index">
          <div v-if="player.score >= store.scoreLimit">
            <p>{{ player.name }} has won with {{ player.score }} points!</p>
          </div>
          <p>{{ player.name }}: {{ player.score }}</p>
        </div>
        <UButton
          @click="closeModal()"
          label="Close"
          color="secondary"
          variant="solid"
          class="flex justify-center"
        />
      </div>
    </template>
  </UModal>
  <section class="flex flex-col flex-1 min-w-sm">
    <div class="flex flex-col flex-1 overflow-y-auto gap-5 px-4 py-6">
      <div v-if="store.rounds.length === 0" class="text-center">Add a round to begin</div>
      <RoundCard
        v-for="(round, index) in store.rounds"
        :key="index"
        :round-number="index + 1"
        :round="round"
        :show-delete-button="store.rounds.length - 1 === index"
        @delete-round="store.deleteRound(index)"
      />
      <ScoreCard :players="store.players" />
    </div>
    <!-- Sticky Add Round button -->
    <div class="flex flex-col gap-2 sticky bottom-0 shadow-inner p-4 border-t w-full">
      <UDrawer ref="drawer" :dismissible="true" :open="isDrawerOpen">
        <UButton
          @click="isDrawerOpen = true"
          label="Add Round"
          color="primary"
          variant="solid"
          trailing-icon="i-lucide-chevron-up"
          class="flex justify-center w-full"
        />
        <template #content>
          <SoloRoundView @save="isDrawerOpen = false" @close="isDrawerOpen = false" />
        </template>
      </UDrawer>
      <UButton class="flex justify-center w-full" color="error" variant="solid" @click="closeGame()"
        >Close Game
      </UButton>
    </div>
  </section>
</template>
<style scoped></style>
