<script setup lang="ts">
import { ref } from 'vue';
const title = ref('title')
// onMounted(async () => {
//   try {
//     const response = await axios.get('https://localhost:44370/DutchBlitz/api/test');
//     title.value = response.data;
//   } catch(error) {
//     title.value = "Multi!"
//   }
// })
</script>
<template>
  <h1>{{ title }}</h1>
</template>
