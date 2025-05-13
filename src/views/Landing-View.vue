<script setup lang="ts">
import { useSoloStore } from '@/stores/Solo-Store';
import { getGuid } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gameCode = ref('');

const hostGame = async () => {
  router.push('/multi/' + getGuid());
};

const joinGame = async () => {

};

</script>
<template>
  <section class="flex flex-col items-center justify-center  gap-5">
    <div class="flex flex-col gap-5 w-full">
      <UButton to="/solo" class="flex flex-col items-start start p-5 min-h-40 w-full" color="primary" variant="subtle"
        size="xl">
        <h2 class="head">Solo Mode</h2>
        <p>Use this mode if you want to track scores for all players in your group </p>
      </UButton>
      <UButton @click="hostGame" class="flex flex-col items-start start p-5 min-h-40 w-full" color="primary"
        variant="subtle" size="xl">
        <h2 class="head">Host Room</h2>
        <p>Host a new game and share room codes with friends to let them track their scores </p>
      </UButton>
      <UCard variant="soft">
        <div class="flex flex-col gap-5 w-full">
          <h2>Join Room</h2>
          <UInput class=" w-full" v-model="gameCode" placeholder="Enter Room Code" />
          <UButton variant="outline" size="xl" class="w-full  justify-center" @click="joinGame">Join</UButton>
        </div>
      </UCard>
    </div>
  </section>
</template>
<style scoped></style>
