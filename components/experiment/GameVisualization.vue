<template>
  <div>
    <h3 class="text-white underline underline-offset-8">Hyperparameters</h3>
    <div class="flex flex-row gap-10">
      <ExperimentParamSelect v-model="selectedAlgorithm" name="Algorithm" :options="algorithmOptions" />
      <ExperimentParamSelect v-model="selectedMap" name="Map" :option="config.map" :options="mapOptions" />
      <ExperimentParamSelect v-model="selectedConfig" name="Config" :options="configOptions" />
    </div>
    <!-- TODO: Loader -->
    <div v-if="state === 'visualization'">
      <!-- TODO: implement -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ExperimentConfig } from '~/types';
import { algorithmOptions, configOptions, mapOptions } from '~/constants';

const props = defineProps({
  config: {
    type: Object as PropType<ExperimentConfig>,
    required: true,
  },
});

const selectedAlgorithm = ref<string>(props.config.algorithm);
const selectedMap = ref<string>(props.config.map);
const selectedConfig = ref<string>(props.config.config);

const state = ref<'config' | 'visualization'>('config');

onMounted(async () => {
  await getData();
});

const getData = async () => {
  const queryParams = new URLSearchParams(props.config);
  try {
    const data = await $fetch('/api/experiments?' + queryParams.toString());
    state.value = 'visualization';
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
</script>
