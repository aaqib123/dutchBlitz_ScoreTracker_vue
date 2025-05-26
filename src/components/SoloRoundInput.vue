<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store'
import type { RoundScore } from '@/stores/Solo.utils'
import { ref, computed, watch } from 'vue'

const store = useSoloStore()
const currentRound = ref<Record<string, RoundScore>>({})
const submittedPlayers = ref<Set<string>>(new Set())
const isSolo = computed(() => store.isSolo)
const emit = defineEmits(['save', 'close'])

// Initialize score entries for each player by ID
store.players.forEach((player) => {
  currentRound.value[player.id] = {
    dutch: 0,
    blitz: 0,
    total: 0,
  }
})

const currentPlayerId = computed(() => store.currentPlayerId)
const isAllSubmitted = computed(() => submittedPlayers.value.size === store.players.length)

function resetScores() {
  currentRound.value[currentPlayerId.value] = { dutch: 0, blitz: 0, total: 0 }
}

function saveScore() {
  if (store.isSolo) {
    for (const id in currentRound.value) {
      const score = currentRound.value[id]
      score.total = score.dutch + score.blitz * -2
      submittedPlayers.value.add(id)
    }
  } else {
    const score = currentRound.value[currentPlayerId.value]
    score.total = score.dutch + score.blitz * -2
    submittedPlayers.value.add(currentPlayerId.value)
  }
}

watch(isAllSubmitted, (newVal) => {
  if (newVal) {
    const scoreEntries = Object.entries(currentRound.value).map(([playerId, score]) => ({ playerId, score }))
    store.addRound(scoreEntries)
    emit('save')
  }
})

function close() {
  emit('close')
}
</script>
<template>
  <form @submit.prevent="saveScore" class="p-1 self-center">
    <table class="w-full text-sm text-left border-collapse">
      <thead class="bg-gray-50 text-gray-700 font-semibold">
        <tr>
          <th class="py-2 px-4 border-b">Player</th>
          <th class="py-2 px-4 border-b">Dutch</th>
          <th class="py-2 px-4 border-b">Blitz</th>
          <th class="py-2 px-4 border-b">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in store.players" :key="player.id" class="border-t">
          <td class="py-2 px-4">{{ player.name }}</td>
          <td class="py-2 px-4" v-if="isSolo || player.id === currentPlayerId">
            <UInput type="number" class="w-20 rounded border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              v-model.number="currentRound[player.id].dutch" :disabled="submittedPlayers.has(player.id)" />
          </td>
          <td class="py-2 px-4" v-if="isSolo || player.id === currentPlayerId">
            <UInput type="number" class="w-20 rounded border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              v-model.number="currentRound[player.id].blitz" :disabled="submittedPlayers.has(player.id)" /> *-2
          </td>
          <td class="py-2 px-4 font-medium text-right" v-if="isSolo || player.id === currentPlayerId"> {{
            currentRound[player.id].dutch }} + {{ currentRound[player.id].blitz * -2 }} = {{
              currentRound[player.id].dutch + currentRound[player.id].blitz * -2 }} </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center gap-5 mt-4">
      <UButton @click="resetScores()" color="warning" :disabled="submittedPlayers.has(currentPlayerId)"> Reset
      </UButton>
      <UButton type="submit" color="primary" :disabled="submittedPlayers.has(currentPlayerId)"> Submit Score </UButton>
      <UButton @click="close()" color="error"> Cancel </UButton>
    </div>
    <div v-if="isAllSubmitted" class="text-center text-green-600 mt-2 font-semibold">All players have submitted their
      scores!</div>
  </form>
</template>
