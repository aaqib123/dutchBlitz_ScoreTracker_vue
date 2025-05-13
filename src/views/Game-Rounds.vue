<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store'
import SoloRoundView from '@/components/SoloRoundInput.vue'
import router from '@/router'
import RoundCard from '@/components/RoundCard.vue'
import ScoreCard from '@/components/ScoreCard.vue'
import { ref } from 'vue'
import WinnerDialog from '@/components/WinnerDialog.vue'

const store = useSoloStore()
const isDrawerOpen = ref(false)

function closeGame() {
  store.endGame()
  router.back()
}
</script>
<template>
  <section class=" flex flex-col flex-1 mb-20">
    <div class="rounds flex flex-col flex-1 overflow-y-auto gap-5">
      <div v-if="store.rounds.length === 0" class="text-center">Add a round to begin</div>
      <RoundCard v-for="(round, index) in store.rounds" :key="index" :round-number="index + 1" :round="round"
        :show-delete-button="store.rounds.length - 1 === index" @delete-round="store.deleteRound(index)" />
      <ScoreCard :players="store.players" />
    </div>
    <div class="drawer flex flex-col gap-2 shadow-inner p-4 border-t w-full">
      <UDrawer ref="drawer" :dismissible="true" :open="isDrawerOpen">
        <UButton @click="isDrawerOpen = true" label="Add Round" color="primary" variant="solid"
          trailing-icon="i-lucide-chevron-up" class="flex justify-center " />
        <template #content>
          <SoloRoundView @save="isDrawerOpen = false" @close="isDrawerOpen = false" />
        </template>
      </UDrawer>
      <UButton class="flex justify-center " color="error" variant="solid" @click="closeGame()">Close Game </UButton>
    </div>
  </section>
  <WinnerDialog />
</template>
<style scoped>
.rounds {
  flex-flow: column-reverse;
}

.drawer {
  background: linear-gradient(180deg, #161f35, transparent);
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
