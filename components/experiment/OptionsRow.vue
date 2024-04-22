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
        <h3>1/3 Training algorithm</h3>
        <p class="main-text mb-4">
          Select the algorithm that will be used to train the agents. The choice of algorithm can significantly affect
          the performance of the agents and the time it takes to train them.
        </p>
        <li class="main-text">
          <span class="purple-text">MADDPG: Multi-Agent Deep Deterministic Policy Gradient</span>
          extends the DDPG algorithm to multi-agent systems, using a centralized training with decentralized execution
          approach. It's designed for tasks where agents' actions are interdependent, excelling in mixed cooperation and
          competition settings. MADDPG is perfect for high-dimensional continuous action spaces where agents must learn
          advanced strategies to interact effectively. For further information, check out the
          <a class="a-link" target="_blank" href="https://docs.agilerl.com/en/latest/api/algorithms/matd3.html"
            >documentation</a
          >.
        </li>
        <li class="main-text mt-2">
          <span class="purple-text">MATD3: Multi-Agent Twin Delayed Deep Deterministic Policy Gradient</span>
          is a multi-agent version of the TD3 algorithm, employing a twin-critic design to reduce overestimation bias
          and enhance training stability. This method is well-suited for environments requiring precise, continuous
          control and coordination among multiple agents. For further information, check out the
          <a class="a-link" target="_blank" href="https://docs.agilerl.com/en/latest/api/algorithms/maddpg.html#maddpg"
            >documentation</a
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
        <h3>2/3 Map</h3>
        <p class="main-text">
          Select the map on which the agents will be trained. The map can significantly affect the agents' strategies
          and the complexity of the environment. Each map has unique features that can be used to test different aspects
          of the agents' capabilities.<br />
          If there are more walls, there are more places to hide, and it is harder to find the opponent. If there are
          more open spaces, it is harder to hide, but easier to find the opponent.
        </p>
        <div class="flex flex-row gap-10 justify-center mt-10">
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
      </div>
      <div v-else-if="state == 'config'">
        <h3>3/3 Pre-made Configuration</h3>
        <p class="main-text mb-4">
          Select one of the pre-made configurations. The first row specifies the number of hiders (ducks), the second
          row the hiding and seeking time and lastly, the third row the number of seekers (programmers) and their
          visibility radius.
        </p>
        <div class="flex flex-row gap-10">
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
