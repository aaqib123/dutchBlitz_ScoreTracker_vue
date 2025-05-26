<script setup lang="ts">
import type { Round } from '@/stores/Solo.utils'
import type { PropType } from 'vue'
import { useSoloStore } from '@/stores/Solo-Store'

const store = useSoloStore()

const props = defineProps({
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
  <UCard class="shadow-md" :ui="{ root: 'm-1', header: 'p-2', body: 'sm:p-2' }">
    <template #header>
      <div class="flex justify-between items-center"> Round {{ roundNumber }} <UButton v-if="showDeleteButton"
          @click="$emit('delete-round', round.id)" size="xs" variant="outline" color="error"> Delete Round </UButton>
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
        <tr v-for="entry in round.scores" :key="entry.playerId">
          <td class="p-1">{{store.players.find(p => p.id === entry.playerId)?.name || 'Unknown'}}</td>
          <td class="p-1">{{ entry.score.dutch }}</td>
          <td class="p-1">{{ entry.score.blitz }}</td>
          <td class="p-1">{{ entry.score.total }}</td>
        </tr>
      </tbody>
    </table>
  </UCard>
</template>
<style scoped></style>
