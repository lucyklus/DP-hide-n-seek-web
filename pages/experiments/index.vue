<template>
  <div class="h-full flex flex-col">
    <h1>II. Experiments</h1>
    <div v-if="state === 'intro'">
      <p class="main-text">
        This interactive page allows you to delve deep into the mechanics of the game, providing you with the tools to
        adjust the hyperparameters, as the training algorithm, the map and the game configuration. <br />
        <br />

        After selecting the desired configuration, you can observe the agents' movements and strategies in real-time.<br />
        The environment we chose is a hide-and-seek game where the hiders (ducks) try to hide from the seekers
        (programmers). The hiders can move around the map and hide behind walls, while the seekers can move around the
        map and try to find the hiders. The hiders win if at least one of the team members remain hidden, while the
        seekers win if they find all the hiders before the time runs out.
      </p>
      <div v-if="isMobile" class="w-full flex justify-center rounded bg-black bg-opacity-50 p-2 mt-2">
        <h2 class="text-xl">The following part works only on desktop :(</h2>
      </div>
      <NextButton v-else @click="state = 'experiment'" />
    </div>
    <div v-else>
      <ExperimentOptionsRow v-if="!config" @prepared="onPrepared" />
      <ClientOnly v-else>
        <ExperimentGameVisualization :config="config" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExperimentConfig } from '~/types';
const config = ref<ExperimentConfig | null>(null);
const state = ref<'intro' | 'experiment'>('intro');

const onPrepared = (_config: ExperimentConfig) => {
  config.value = _config;
};
const isMobile = ref(false);
onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
  });
});
</script>
