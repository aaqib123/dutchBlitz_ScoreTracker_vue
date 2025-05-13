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
  <UCard class="shadow-md" :ui="{
    root: 'm-1',
    header: 'p-2',
    body: 'sm:p-2'
  }">
    <template #header>
      <div class="flex justify-between items-center"> Round {{ roundNumber }} <UButton v-if="showDeleteButton"
          @click="$emit('delete-round', roundNumber)" size="xs" variant="outline" color="error"> Delete Round </UButton>
      </div>
    </template>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="p-1 text-left">Player</th>
          <th class="p-1 text-left">Dutch</th>
          <th class="p-1 text-left">Blitz</th>
          <th class="p-1 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, playerName) in round" :key="playerName">
          <td class="p-1">{{ playerName }}</td>
          <td class="p-1">{{ player.dutch }}</td>
          <td class="p-1">{{ player.blitz }}</td>
          <td class="p-1">{{ player.total }}</td>
        </tr>
      </tbody>
    </table>
  </UCard>
</template>
<style scoped></style>
