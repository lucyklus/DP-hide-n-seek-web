<template>
  <div class="h-full flex flex-col">
    <h1>II. Experiments</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    </p>
    <ExperimentOptionsRow v-if="!config" @prepared="onPrepared" />
    <ClientOnly v-else>
      <ExperimentGameVisualization :config="config" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { ExperimentConfig } from '~/types';
const config = ref<ExperimentConfig | null>(null);

// TODO: Remove later, just for testing
config.value = {
  algorithm: 'MADDPG',
  map: 'm1',
  config: 'c1',
};

const onPrepared = (_config: ExperimentConfig) => {
  config.value = _config;
  console.log('Experiment prepared:', _config);
};
</script>
