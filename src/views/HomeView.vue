<template>
  <div class="flex flex-col h-full items-center justify-evenly">
    <RouterLink to="solo" class="bg-indigo-200 p-30 text-3xl rounded-lg border-2 border-indigo-700"
      >Solo</RouterLink
    >
    <RouterLink to="multi" class="bg-indigo-200 p-30 text-3xl rounded-lg border-2 border-indigo-700"
      >Multi</RouterLink
    >
  </div>

  <RouterView />
</template>
