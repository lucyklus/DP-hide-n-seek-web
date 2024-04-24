<template>
  <div>
    <h1>III. {{ $t('nav.tutorial') }}</h1>
    <p class="main-text">
      {{ $t('tutorial.intro') }}
    </p>
    <NextButton :on-click="() => $router.push(localePath('/tutorial/prerequisities'))" />
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>
