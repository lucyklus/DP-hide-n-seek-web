<template>
  <div class="h-full flex flex-col">
    <h1>II. Experiments</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    </p>
    <ExperimentOptions v-if="state === 'config'" @prepared="(config) => onPrepared(config)" />
    <div v-else-if="state === 'visualization'">
      <p>Config</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExperimentConfig } from '~/types';
type States = 'config' | 'visualization';
const state = ref<States>('config');
const config = ref<ExperimentConfig | null>(null);

const onPrepared = (_config: ExperimentConfig) => {
  config.value = _config;
  console.log('Experiment prepared:', _config);
  state.value = 'visualization';
};
</script>
