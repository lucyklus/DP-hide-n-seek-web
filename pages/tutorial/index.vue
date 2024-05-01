<template>
  <div>
    <h1>III. {{ $t('nav.tutorial') }}</h1>
    <p class="main-text">
      {{ $t('tutorial.intro') }}
    </p>
    <span class="flex main-text mt-10 gap-2">
      <p>{{ $t('tutorial.wholeCode') }}</p>
      <a href="https://github.com/lucyklus/DP-hide-n-seek-implementation" target="_blank" class="flex items-center">
        Github.</a
      >
    </span>
    <NextButton :on-click="() => $router.push(localePath('/tutorial/prerequisities'))" />
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>
