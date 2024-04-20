<template>
  <div class="flex flex-col items-center justify-between my-10 h-full">
    <transition
      name="fade"
      mode="out-in"
      enter-active-class="transition-opacity duration-500"
      leave-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="state == 'algorithm'" class="flex flex-row gap-10">
        <ExperimentOptionButton
          :selected="selectedAlgorithm === 'MADDPG'"
          img-src="/img/MADDPG.jpeg"
          text="MADDPG"
          @click="selectAlgorithm('MADDPG')"
        />
        <ExperimentOptionButton
          :selected="selectedAlgorithm === 'MATD3'"
          img-src="/img/MATD3.jpeg"
          text="MATD3"
          @click="selectAlgorithm('MATD3')"
        />
      </div>
      <div v-else-if="state == 'map'" class="flex flex-row gap-10">
        <ExperimentOptionButton
          :selected="selectedMap === 'm1'"
          img-src="/img/map_1.png"
          text="Crossroad"
          @click="selectMap('m1')"
        />
        <ExperimentOptionButton
          :selected="selectedMap === 'm2'"
          img-src="/img/map_2.png"
          text="Boxed Labyrinth"
          @click="selectMap('m2')"
        />
        <ExperimentOptionButton
          :selected="selectedMap === 'm3'"
          img-src="/img/map_3.png"
          text="Inner Circle"
          @click="selectMap('m3')"
        />
        <ExperimentOptionButton
          :selected="selectedMap === 'm4'"
          img-src="/img/map_4.png"
          text="Patchwork"
          @click="selectMap('m4')"
        />
        <ExperimentOptionButton
          :selected="selectedMap === 'm5'"
          img-src="/img/map_5.png"
          text="Open Field"
          @click="selectMap('m5')"
        />
      </div>
      <div v-else-if="state == 'config'" class="flex flex-row gap-10">
        <ExperimentOptionButton
          :selected="selectedConfig === 'c1'"
          img-src="/img/config_1.png"
          text="Balanced Classic"
          @click="selectConfig('c1')"
        />
        <ExperimentOptionButton
          :selected="selectedConfig === 'c2'"
          img-src="/img/config_2.png"
          text="Stealth and Pursuit"
          @click="selectConfig('c2')"
        />
        <ExperimentOptionButton
          :selected="selectedConfig === 'c3'"
          img-src="/img/config_3.png"
          text="Endurance Hideout"
          @click="selectConfig('c3')"
        />
      </div>
    </transition>
    <NextButton :disabled="!hasSelectedValue" @click="nextState" />
  </div>
</template>

<script lang="ts" setup>
import type { AlgorithmType, MapType, ConfigType, ExperimentConfig } from '~/types';
type States = 'algorithm' | 'map' | 'config';

const state = ref<States>('algorithm');
const selectedAlgorithm = ref<AlgorithmType | null>(null);
const selectedMap = ref<MapType | null>(null);
const selectedConfig = ref<ConfigType | null>(null);
const hasSelectedValue = ref(false);

const emit = defineEmits<{
  (e: 'prepared', value: ExperimentConfig): void;
}>();

const nextState = () => {
  if (state.value === 'algorithm') {
    if (selectedAlgorithm.value) {
      state.value = 'map';
    }
  } else if (state.value === 'map') {
    if (selectedMap.value) {
      state.value = 'config';
    }
  } else if (state.value === 'config') {
    if (selectedConfig.value) {
      // Emit event "prepared" to parent component
      emit('prepared', {
        algorithm: selectedAlgorithm.value!,
        map: selectedMap.value!,
        config: selectedConfig.value!,
      });
    }
  }
  hasSelectedValue.value = false;
};

const selectAlgorithm = (algorithm: AlgorithmType) => {
  selectedAlgorithm.value = algorithm;
  hasSelectedValue.value = true;
};

const selectMap = (map: MapType) => {
  selectedMap.value = map;
  hasSelectedValue.value = true;
};

const selectConfig = (config: ConfigType) => {
  selectedConfig.value = config;
  hasSelectedValue.value = true;
};
</script>