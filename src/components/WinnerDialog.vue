<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store';
import { computed, ref } from 'vue';

const store = useSoloStore()
const setModalClosed = ref(true)
const playerScores = ref(store.players)

const modalOpen = computed(() => store.didWin && setModalClosed)
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
        <UButton @click="closeModal()" label="Close" color="secondary" variant="solid" class="flex justify-center" />
      </div>
    </template>
  </UModal>
</template>
