<template>
  <div class="flex flex-col items-center justify-between mt-5 mb-10 h-full">
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
      <div v-if="state == 'algorithm'">
        <h2>1/3 {{ $t('experiments.trainingAlgorithm') }}</h2>
        <h3>{{ $t('experiments.whatIsATrainigAlgorithm') }}</h3>
        <p class="main-text mb-4">
          {{ $t('experiments.whatIsATrainigAlgorithmText') }}
        </p>
        <h3>{{ $t('experiments.choosingTheTrainingAlgorithm') }}</h3>
        <p class="main-text mb-4">
          {{ $t('experiments.choosingTheTrainingAlgorithmText') }}
        </p>
        <li class="main-text">
          <span class="purple-text">{{ $t('experiments.maddpg') }}</span>
          <!-- TODO: rewrite to more understandable way -->
          {{ $t('experiments.maddpgText') }}
          <a
            class="a-link"
            target="_blank"
            href="https://docs.agilerl.com/en/latest/api/algorithms/maddpg.html#maddpg"
            >{{ $t('experiments.documentation') }}</a
          >.
        </li>
        <li class="main-text mt-2">
          <span class="purple-text">{{ $t('experiments.matd3') }}</span>
          <!-- TODO: rewrite to more understandable way -->
          {{ $t('experiments.matd3Text') }}
          <a class="a-link" target="_blank" href="https://docs.agilerl.com/en/latest/api/algorithms/matd3.html">{{
            $t('experiments.documentation')
          }}</a
          >.
        </li>
        <div class="flex flex-row gap-10 justify-center mt-10">
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
      </div>
      <div v-else-if="state == 'map'">
        <h2>2/3 {{ $t('experiments.trainingMap') }}</h2>
        <p class="main-text">
          {{ $t('experiments.selectMap') }}<br /><br />
          {{ $t('experiments.ifMoreWalls') }}
        </p>
        <div class="flex flex-row gap-10 justify-center mt-10">
          <ExperimentOptionButton
            :selected="selectedMap === 'm1'"
            img-src="/img/map_1.png"
            :text="$t('experiments.crossroad')"
            @click="selectMap('m1')"
          />
          <ExperimentOptionButton
            :selected="selectedMap === 'm2'"
            img-src="/img/map_2.png"
            :text="$t('experiments.boxedLabyrinth')"
            @click="selectMap('m2')"
          />
          <ExperimentOptionButton
            :selected="selectedMap === 'm3'"
            img-src="/img/map_3.png"
            :text="$t('experiments.innerCircle')"
            @click="selectMap('m3')"
          />
          <ExperimentOptionButton
            :selected="selectedMap === 'm4'"
            img-src="/img/map_4.png"
            :text="$t('experiments.patchwork')"
            @click="selectMap('m4')"
          />
          <ExperimentOptionButton
            :selected="selectedMap === 'm5'"
            img-src="/img/map_5.png"
            :text="$t('experiments.openField')"
            @click="selectMap('m5')"
          />
        </div>
      </div>
      <div v-else-if="state == 'config'">
        <h2>3/3 {{ $t('experiments.preMadeConfiguration') }}</h2>
        <p class="main-text mb-4">
          {{ $t('experiments.preMadeConfigurationText') }}
        </p>
        <div class="flex flex-row gap-10">
          <ExperimentOptionButton
            :selected="selectedConfig === 'c1'"
            img-src="/img/config_1.png"
            :text="$t('experiments.balancedClassic')"
            @click="selectConfig('c1')"
          />
          <ExperimentOptionButton
            :selected="selectedConfig === 'c2'"
            img-src="/img/config_2.png"
            :text="$t('experiments.stealthAndPursuit')"
            @click="selectConfig('c2')"
          />
          <ExperimentOptionButton
            :selected="selectedConfig === 'c3'"
            img-src="/img/config_3.png"
            :text="$t('experiments.enduranceHideout')"
            @click="selectConfig('c3')"
          />
        </div>
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
      // TODO: Loader component
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
