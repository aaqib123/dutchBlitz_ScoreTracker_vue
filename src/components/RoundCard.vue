<script setup lang="ts">
//accepts props from parent component : round number, player name, dutch score, blitz score, total score
import type { Round } from '@/stores/Solo.utils' // Adjust the path to where the Round type is defined
import type { PropType } from 'vue'

defineProps({
  roundNumber: {
    type: Number,
    required: true,
  },
  round: {
    type: Object as PropType<Round>,
    required: true,
  },
  showDeleteButton: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <UCard class="shadow-md">
    <template #header>
      <div class="flex justify-between">
        Round {{ roundNumber }}
        <UButton
          v-if="showDeleteButton"
          @click="$emit('delete-round', roundNumber)"
          size="xs"
          variant="outline"
          color="error"
          class="mt-2"
        >
          Delete Round
        </UButton>
      </div>
    </template>
    <table class="min-w-full table-auto">
      <thead class="border-b">
        <tr>
          <th class="px-4 py-2 text-left">Player</th>
          <th class="px-4 py-2 text-left">Dutch</th>
          <th class="px-4 py-2 text-left">Blitz</th>
          <th class="px-4 py-2 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, playerName) in round" :key="playerName" class="border-b">
          <td class="px-4 py-2">{{ playerName }}</td>
          <td class="px-4 py-2">{{ player.dutch }}</td>
          <td class="px-4 py-2">{{ player.blitz }}</td>
          <td class="px-4 py-2">{{ player.total }}</td>
        </tr>
      </tbody>
    </table>
  </UCard>
</template>
<style scoped></style>
