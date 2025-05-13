<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>
<template>
  <section class="flex flex-col justify-center">
    <h1>
      <RouterLink to="/">DutchBlitz</RouterLink>
    </h1>
    <UCard class="h-full">
      <RouterView />
    </UCard>
  </section>
</template>
