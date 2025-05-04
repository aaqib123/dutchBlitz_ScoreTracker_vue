<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store'

const store = useSoloStore()
</script>
<template>
  <section class="settings-page flex flex-col gap-5 w-full p-[1rem]">
    <h2>Settings</h2>
    <div>
      <label for="player-cards">Players</label>
      <UCard id="player-cards" class="w-full" variant="soft">
        <div class="card flex flex-col gap-4">
          <div v-for="(player, index) in store.players" :key="index">
            <UInput v-model="player.name" variant="filled" />
            <UButton
              icon="i-lucide-trash"
              size="md"
              color="error"
              variant="solid"
              @click="store.players.splice(index, 1)"
            />
          </div>
          <UButton
            class="justify-center"
            v-if="store.getPlayerCount < 8"
            icon="i-lucide-plus"
            size="md"
            color="secondary"
            variant="solid"
            @click="store.addPlayer('Player ' + (store.getPlayerCount + 1))"
          />
        </div>
      </UCard>
    </div>
    <div class="flex w-full flex-col gap-1">
      <label for="scoreLimit">Winning Score</label>
      <UInputNumber
        id="scoreLimit"
        v-model="store.scoreLimit"
        showButtons
        buttonLayout="horizontal"
        :step="5"
      >
        <template #incrementbuttonicon>
          <span class="pi pi-plus" />
        </template>
        <template #decrementbuttonicon>
          <span class="pi pi-minus" />
        </template>
      </UInputNumber>
    </div>
    <UButton
      class="w-full justify-center"
      @click="store.startGame()"
      :to="{
        name: 'SoloRounds',
      }"
      variant="outline"
      size="xl"
      :disabled="store.getPlayerCount < 2"
    >
      START
    </UButton>
    <UButton
      class="w-full justify-center"
      color="error"
      @click="store.startGame()"
      to="/"
      variant="outline"
      size="xl"
    >
      BACK
    </UButton>
  </section>
</template>
<style scoped></style>
