<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store'
import type { RoundScore } from '@/stores/Solo.utils'
import { ref } from 'vue'

const store = useSoloStore()
const currentRound = ref<Record<string, RoundScore>>({})

//emit save
const emit = defineEmits(['save', 'close'])

store.players.forEach((player) => {
  currentRound.value[player.name] = {
    dutch: 0,
    blitz: 0,
    total: 0,
  }
})

function resetScores() {
  for (const name in currentRound.value) {
    currentRound.value[name] = { dutch: 0, blitz: 0, total: 0 }
  }
}

function saveRound() {
  for (const name in currentRound.value) {
    const player = currentRound.value[name]
    player.total = player.dutch + player.blitz * -2
  }
  store.addRound(currentRound.value)
  emit('save')
}

function close() {
  emit('close')
}
</script>
<template>
  <form @submit.prevent="saveRound" class="p-1 self-center">
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
          <td class="py-2 px-4">
            <UInput
              type="number"
              class="w-20 rounded border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              v-model.number="currentRound[player.name].dutch"
            />
          </td>
          <td class="py-2 px-4">
            <UInput
              type="number"
              class="w-20 rounded border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              v-model.number="currentRound[player.name].blitz"
            />
            *-2
          </td>
          <td class="py-2 px-4 font-medium text-right">
            {{ currentRound[player.name].dutch }} + {{ currentRound[player.name].blitz * -2 }} =
            {{ currentRound[player.name].dutch + currentRound[player.name].blitz * -2 }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center gap-5">
      <UButton @click="resetScores()" color="warning"> Reset </UButton>
      <UButton type="submit" color="primary"> Save </UButton>
      <UButton @click="close()" color="error"> Cancel </UButton>
    </div>
  </form>
</template>
