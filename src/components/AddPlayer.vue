<script setup lang="ts">
import type { Player } from '../stores/Solo.utils'
import { ref } from 'vue'

const props = defineProps<{
  players: Player[]
  isSolo: boolean
  currentUserId: string
  isHost: boolean
}>()

const emit = defineEmits<{
  add: [name: string]
  delete: [index: string]
  update: [index: string, name: string]
  readyToggle: [playerId: string] // new event for ready toggle
}>()

// Track which players are in editing mode (by player.id)
const editingPlayerIds = ref(new Set<string>())

const addPlayer = () => {
  emit('add', `new player`)
}

const deletePlayer = (index: string) => {
  emit('delete', index)
}

function toggleEditPlayer(playerId: string) {
  const player = props.players.find((p) => p.id === playerId)
  if (!player) return // safety check

  if (!editingPlayerIds.value.has(player.id)) {
    // Enable editing for this player
    editingPlayerIds.value.add(player.id)
  } else {
    // Save new name
    const newName = player.name.trim()
    if (!newName) {
      alert('Player name cannot be empty')
      return
    }
    emit('update', player.id, newName)
    editingPlayerIds.value.delete(player.id)
  }
}

function toggleReady(playerId: string) {
  emit('readyToggle', playerId)
}

function joinTestPlayer() {
  const randomName = 'Player_' + Math.floor(Math.random() * 1000)
  emit('add', randomName)
}
</script>
<template>
  <div class="flex w-full flex-col gap-1">
    <h3>Players</h3>
    <div class="card flex flex-col gap-3">
      <div
        class="flex justify-between items-center gap-2"
        v-for="player in players"
        :key="player.id"
      >
        <UInput
          variant="outline"
          v-model="player.name"
          :readonly="!editingPlayerIds.has(player.id)"
        />
        <!-- Edit / Save button only for host (solo) or current player -->
        <template v-if="isSolo || currentUserId === player.id">
          <UButton
            size="sm"
            color="primary"
            variant="solid"
            :icon="editingPlayerIds.has(player.id) ? 'i-lucide-check' : 'i-lucide-edit'"
            @click="toggleEditPlayer(player.id)"
          />
        </template>
        <template v-if="!isSolo && !isHost && currentUserId === player.id">
          <UButton
            size="sm"
            :color="player.isReady ? 'success' : 'secondary'"
            variant="solid"
            @click="toggleReady(player.id)"
          >
            {{ player.isReady ? 'Ready' : 'not Ready' }}
          </UButton>
        </template>
        <!-- Delete button only for host -->
        <UButton
          v-if="isSolo"
          icon="i-lucide-trash"
          size="sm"
          color="error"
          variant="solid"
          @click="deletePlayer(player.id)"
        />
      </div>
      <UButton
        class="justify-center"
        v-if="isSolo && players.length < 8"
        icon="i-lucide-plus"
        size="md"
        color="secondary"
        variant="solid"
        @click="addPlayer"
      >
        Add new player
      </UButton>
      <!-- Temporary join test button -->
      <UButton class="justify-center" color="warning" variant="outline" @click="joinTestPlayer">
        Join Test Player
      </UButton>
    </div>
  </div>
</template>
<style scoped></style>
