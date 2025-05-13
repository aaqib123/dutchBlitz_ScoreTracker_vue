<script setup lang="ts">
import router from '@/router';
import { useSoloStore } from '@/stores/Solo-Store'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const store = useSoloStore();
const route = useRoute();
const gameMode = route.path.includes('multi') ? 'multi' : 'solo';
const type = ref(gameMode === 'solo' ? 'Solo' : 'Multi');


const startGame = () => {
  store.startGame();
  if (gameMode === 'multi') {
    router.push({
      name: 'MultiRounds',
      params: { roomId: route.params.roomId }
    });
    return;
  }
  router.push({ name: 'SoloRounds' });
};

</script>
<template>
  <section class="settings-page flex flex-col gap-2 w-full">
    <h2>{{ type }} Settings</h2>
    <UCard variant="soft">
      <div class="flex w-full flex-col gap-1">
        <h3 for="player-cards">Players</h3>
        <div class="card flex flex-col gap-3">
          <div class="flex  justify-between " v-for="(player, index) in store.players" :key="index">
            <UInput variant="outline" v-model.number="player.name" />
            <UButton icon="i-lucide-trash" size="sm" color="error" variant="solid"
              @click="store.players.splice(index, 1)" />
          </div>
          <UButton class="justify-center" v-if="store.getPlayerCount < 8" icon="i-lucide-plus" size="md"
            color="secondary" variant="solid" @click="store.addPlayer('Player ' + (store.getPlayerCount + 1))">Add new
            player </UButton>
        </div>
      </div>
      <div class="flex w-full flex-col gap-1 mt-[1rem]">
        <h3 for="scoreLimit">Winning Score</h3>
        <UInputNumber id="scoreLimit" v-model="store.scoreLimit" showButtons buttonLayout="horizontal" :step="5">
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </UInputNumber>
      </div>
    </UCard>
    <UButton class="w-full justify-center" @click="startGame()" variant="outline" size="xl"
      :disabled="store.getPlayerCount < 2"> START </UButton>
    <UButton class="w-full justify-center" color="error" @click="router.push('/')" variant="outline" size="xl"> BACK
    </UButton>
  </section>
</template>
<style scoped></style>
