<template>
  <div class="h-full flex flex-col">
    <h1>II. Experiments</h1>
    <div v-if="state === 'intro'">
      <span>
        <p class="main-text">
          This interactive page allows you to delve deep into the background of the training. You are free to choose the
          training algorithm, the map and the configuration.<br />
          To make things simple, we have prepared a <span class="purple-text">'Hide and Seek'</span> environment, where
          programmers (seekers) try to find ducks (hiders) in a maze. The ducks can hide behind walls, while the
          programmers can move around the map and try to find the ducks. The ducks win if at least one of them remains
          hidden, while the programmers win if they find all the ducks before the time runs out.<br />
          <br />
          Before diving in, let's briefly introduce the concepts of Reinforcement Learning and Multi-Agent Reinforcement
          Learning. If you are already familiar with these concepts, feel free to skip ahead to the experiment.
        </p>
        <h3>Reinforcement Learning</h3>
        <p class="main-text">
          Reinforcement Learning is a type of machine learning where an agent learns to make decisions by performing
          actions in an environment. Based on the actions it takes, the agent receives rewards or penalties. The goal of
          RL is for the agent to learn a strategy, or policy, that maximizes the rewards over time. This learning
          process mimics the way humans learn from their successes and failures.
        </p>
        <h3>Multi-Agent Reinforcement Learning</h3>
        <p class="main-text">
          MARL extends RL to scenarios where multiple agents interact within the same environment. These agents can be
          cooperative, competitive, or both. In MARL, each agent learns to optimize its own policy in response to not
          only the environment but also the strategies of other agents. This dynamic adds complexity because the optimal
          strategy for one agent may change as other agents adapt their strategies. MARL is particularly useful in
          complex systems where multiple entities must work together or compete effectively, such as in games, robotic
          coordination, and traffic management.
        </p>
      </span>
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
