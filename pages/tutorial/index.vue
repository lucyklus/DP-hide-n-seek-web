<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <div v-if="pageVisible">
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
      <NextButton :on-click="() => $router.push(localePath('/tutorial/prerequisites'))" />
    </div>
  </transition>
</template>
<script setup lang="ts">
const localePath = useLocalePath();

const pageVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    pageVisible.value = true;
  }, 100);
});
</script>
