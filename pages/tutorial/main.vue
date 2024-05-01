<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <section v-if="pageVisible" id="main">
      <h2>III.IV. {{ $t('nav.main') }}</h2>
      <h3>main.py</h3>
      <p class="main-text">
        {{ $t('tutorial.main.mainpy') }}
      </p>
      <CodeBlock language="python" :code-snippet="MAIN" />
      <h3>walls_configs.json</h3>
      <p class="main-text">
        {{ $t('tutorial.main.wallsConfigs') }}
      </p>
      <CodeBlock language="json" :code-snippet="WALLS_CONFIG" />
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { MAIN, WALLS_CONFIG } from '~/constants';

const pageVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    pageVisible.value = true;
  }, 100);
});
</script>
