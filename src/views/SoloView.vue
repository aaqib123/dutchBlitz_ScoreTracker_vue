<script setup lang="ts">
import { ref } from 'vue'

const title = ref('SOLO')
</script>
<template>
  <section class="flex flex-col items-center h-full">
    <h1>{{ title }}</h1>
    <RouterView />
  </section>
</template>
