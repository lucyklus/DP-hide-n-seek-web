<template>
  <div class="flex flex-col h-screen justify-center">
    <div class="flex items center gap-4 justify-center">
      <img src="/img/duck.png" width="150" height="150" />
      <p class="text-quartiary text-9xl">QUACK</p>
      <img src="/img/programmer.png" width="160" height="160" />
    </div>
    <div class="flex justify-center">
      <nuxt-link to="/home" class="bg-primary px-20 py-5 mt-5">
        <p class="text-base text-lg font-bold">ASK THE DUCK</p>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
