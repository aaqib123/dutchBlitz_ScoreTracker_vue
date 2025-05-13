<script setup lang="ts">
import type { PropType } from 'vue'
import type { Player } from '@/stores/Solo.utils'

defineProps({
  players: {
    type: Array as PropType<Player[]>,
    required: true,
  },
})
</script>
<template>
  <UCard variant="soft" class="shadow-md" :ui="{
    root: 'm-1',
    header: 'p-2',
    body: 'sm:p-2'
  }">
    <template #header>
      <div class="flex justify-between">Score</div>
    </template>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">Player</th>
          <th class="px-4 py-2 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td class="px-4 py-2">{{ player.name }}</td>
          <td class="px-4 py-2">{{ player.score }}</td>
        </tr>
      </tbody>
    </table>
  </UCard>
</template>
