<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <section v-if="pageVisible" id="training">
      <h2>III.III. {{ $t('nav.training') }}</h2>
      <h3>train.py</h3>
      <p class="main-text">
        {{ $t('tutorial.training.trainpy') }}
      </p>
      <CodeBlock language="python" :code-snippet="TRAINING_LOOP" />
      <h3>utils/config.py</h3>
      <p class="main-text">
        {{ $t('tutorial.training.configpy') }}
      </p>
      <CodeBlock language="python" :code-snippet="TRAINING_CONFIG" />
      <h3>.env</h3>
      <p class="main-text">
        {{ $t('tutorial.training.env') }}
      </p>
      <CodeBlock :code-snippet="CONFIG_ENV" />
      <NextButton :on-click="() => $router.push(localePath('/tutorial/main'))" />
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { TRAINING_LOOP, TRAINING_CONFIG, CONFIG_ENV } from '~/constants';
const localePath = useLocalePath();

const pageVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    pageVisible.value = true;
  }, 100);
});
</script>
