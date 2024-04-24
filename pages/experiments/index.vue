<template>
  <div class="h-full flex flex-col">
    <h1>II. {{ $t('nav.experiments') }}</h1>
    <div v-if="state === 'intro'">
      <span>
        <p class="main-text">
          {{ $t('experiments.intro') }}<br />
          {{ $t('experiments.hideNSeek.part1') }}
          <span class="purple-text">{{ $t('experiments.hideNSeek.part2') }}</span> {{ $t('experiments.hideNSeek.part3')
          }}<br />
          <br />
          {{ $t('experiments.beforeDivingIn') }}
        </p>
        <h3>{{ $t('experiments.rl.title') }}</h3>
        <p class="main-text">
          {{ $t('experiments.rl.text') }}
        </p>
        <h3>{{ $t('experiments.marl.title') }}</h3>
        <p class="main-text">
          {{ $t('experiments.marl.text') }}
        </p>
      </span>
      <div v-if="isMobile" class="w-full flex justify-center rounded bg-black bg-opacity-50 p-2 mt-2">
        <h2 class="text-xl">{{ $t('experiments.onlyDesktop') }}</h2>
      </div>
      <NextButton v-else @click="state = 'experiment'" />
    </div>
    <div v-else>
      <ExperimentOptionsRow v-if="!config" @prepared="onPrepared" />
      <ClientOnly v-else>
        <ExperimentGameVisualization class="z-0" :config="config" />
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
