<template>
  <div class="h-full flex flex-col">
    <h1>II. Experiments</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    </p>
    <ExperimentOptionsRow v-if="!config" @prepared="onPrepared" />
    <ExperimentGameVisualization v-else :config="config" />
  </div>
</template>

<script setup lang="ts">
import type { ExperimentConfig } from '~/types';
const config = ref<ExperimentConfig | null>(null);

const onPrepared = (_config: ExperimentConfig) => {
  config.value = _config;
  console.log('Experiment prepared:', _config);
};
</script>
