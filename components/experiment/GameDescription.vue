<template>
  <h2 class="mt-10">{{ $t('experiments.visualization.detailedDescription') }}</h2>
  <h3 class="underline">{{ $t('experiments.visualization.whatHappensFirst.title') }}</h3>
  <p class="main-text">
    {{ $t('experiments.visualization.whatHappensFirst.text.part1') }}
    <span class="purple-text">{{ $t('experiments.visualization.whatHappensFirst.text.part2') }}</span
    >, {{ $t('experiments.visualization.whatHappensFirst.text.part3') }} .
  </p>
  <h3 class="underline">{{ $t('experiments.visualization.trainingProcess.title') }}</h3>
  <p class="main-text">
    {{ $t('experiments.visualization.trainingProcess.text') }}
  </p>
  <h4>{{ $t('experiments.visualization.episodesAndFrames.title') }}</h4>
  <p class="main-text">
    {{ $t('experiments.visualization.episodesAndFrames.text') }}
  </p>
  <h4>{{ $t('experiments.visualization.agentActionDecision.title') }}</h4>
  <p class="main-text">
    {{ $t('experiments.visualization.agentActionDecision.text.part1') }}
    <span class="purple-text">{{ $t('experiments.visualization.agentActionDecision.text.part2') }}</span>
    {{ $t('experiments.visualization.agentActionDecision.text.part3') }} <br /><br />

    {{ $t('experiments.visualization.agentActionDecision.text.part4') }}
    <span class="purple-text">{{ $t('experiments.visualization.agentActionDecision.text.part5') }}</span
    >, {{ $t('experiments.visualization.agentActionDecision.text.part6') }}
    <span class="purple-text">{{ $t('experiments.visualization.agentActionDecision.text.part7') }}</span
    >. {{ $t('experiments.visualization.agentActionDecision.text.part8') }} <br /><br />

    {{ $t('experiments.visualization.agentActionDecision.text.part9') }}
    <span class="purple-text">{{ $t('experiments.visualization.agentActionDecision.text.part10') }}</span
    >. {{ $t('experiments.visualization.agentActionDecision.text.part11') }}
  </p>
  <h4>{{ $t('experiments.visualization.agentsObservationSpace.title') }}</h4>
  <span class="main-text">
    {{ $t('experiments.visualization.agentsObservationSpace.text.part1') }}
    <span class="purple-text">{{ $t('experiments.visualization.agentsObservationSpace.text.part2') }}</span>
    {{ $t('experiments.visualization.agentsObservationSpace.text.part3') }}. <br /><br />

    {{ $t('experiments.visualization.agentsObservationSpace.text.part4') }}<br /><br />
    {{ $t('experiments.visualization.agentsObservationSpace.text.part5') }}
    <br />
    {{ $t('experiments.visualization.agentsObservationSpace.text.part6') }}
    <span class="purple-text">{{ $t('experiments.visualization.agentsObservationSpace.text.part7') }}</span
    >. {{ $t('experiments.visualization.agentsObservationSpace.text.part8') }}
  </span>
  <h4>{{ $t('experiments.visualization.rewardSystem.title') }}</h4>
  <span class="main-text"
    >{{ $t('experiments.visualization.rewardSystem.text.part1') }} <br /><br />
    {{ $t('experiments.visualization.rewardSystem.text.part2') }} <br /><br />

    {{ $t('experiments.visualization.rewardSystem.text.part3') }}:
    <ul class="ml-5 my-5 list-disc">
      <li class="mb-10">
        {{ $t('experiments.visualization.rewardSystem.text.part4') }}:<br />
        <span v-html="eq1"></span>
      </li>
      <li class="mb-10">
        {{ $t('experiments.visualization.rewardSystem.text.part5') }}:<br /><span v-html="eq2"></span>
      </li>
      <li class="mb-10">
        {{ $t('experiments.visualization.rewardSystem.text.part6') }}:<br /><span v-html="eq3"></span>
      </li>
      <li>{{ $t('experiments.visualization.rewardSystem.text.part7') }}:<br /><span v-html="eq4"></span></li>
    </ul>
    {{ $t('experiments.visualization.rewardSystem.text.part8') }}:
    <ul class="ml-5 mt-5 list-disc">
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part9') }} = 0.1</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part10') }} = 0.1</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part11') }} = 40.0</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part12') }} = 2.5</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part13') }} = -5.0</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part14') }} = 10.0</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part15') }} = 2.5</li>
      <li class="mb-2">{{ $t('experiments.visualization.rewardSystem.text.part16') }} = -5.0</li>
      <li>{{ $t('experiments.visualization.rewardSystem.text.part17') }} = 0.5</li>
    </ul>
  </span>
  <h4>{{ $t('experiments.visualization.policyUpdate.title') }}</h4>
  <span class="main-text">
    {{ $t('experiments.visualization.policyUpdate.text') }}
  </span>
  <h3 class="underline">{{ $t('experiments.visualization.loggingAndEvaluation.title') }}</h3>
  <span class="main-text"
    >{{ $t('experiments.visualization.loggingAndEvaluation.text.part1') }}
    <a class="a-link" target="_blank" href="https://wandb.ai/">{{
      $t('experiments.visualization.loggingAndEvaluation.text.part2')
    }}</a>
    {{ $t('experiments.visualization.loggingAndEvaluation.text.part3') }}. <br /><br />
    {{ $t('experiments.visualization.loggingAndEvaluation.text.part4') }}
  </span>
  <iframe class="mt-4" :src="wandbLink" style="border: none; width: 80vw; height: 80vh; margin-bottom: 20px"></iframe>
</template>

<script lang="ts" setup>
// @ts-ignore-next-line
// import katex from 'katex';
import type { AlgorithmType } from '~/types';

const props = defineProps({
  algorithm: {
    type: String as PropType<AlgorithmType>,
    required: true,
  },
});

const wandbLink = computed(() =>
  props.algorithm === 'MADDPG'
    ? 'https://api.wandb.ai/links/marl-hide-n-seek/rztuaxe4'
    : 'https://api.wandb.ai/links/marl-hide-n-seek/kvj7b6qd',
);

const eq1 = ref<string>('');
const eq2 = ref<string>('');
const eq3 = ref<string>('');
const eq4 = ref<string>('');
onMounted(() => {
  // eq1.value = katex.renderToString(
  //   'Reward_{{hider}_i} = \\sum_{t=1}^{T} ({distance\\_reward}_{i, t}) + {time\\_reward}_i + {discovery\\_penalty}_i + {next\\_to\\_wall\\_reward}_i + {hidden\\_reward}_i',
  //   {
  //     throwOnError: false,
  //   },
  // );
  // eq2.value = katex.renderToString('Total\\_Reward\\_Hiders = \\sum_{i=1}^{N} Reward_{{hider}_i}', {
  //   throwOnError: false,
  // });
  // eq3.value = katex.renderToString(
  //   'Reward_{{seeker}_j} = \\sum_{t=1}^{T} ({distance\\_reward}_{j, t}) + {time\\_reward}_j + {discovery\\_reward}_j + {discovery\\_penalty}_j',
  //   {
  //     throwOnError: false,
  //   },
  // );
  // eq4.value = katex.renderToString('Total\\_Reward\\_Seekers = \\sum_{j=1}^{N} Reward_{{seeker}_j}', {
  //   throwOnError: false,
  // });
});
</script>
<style>
span[aria-hidden='true'] {
  display: none;
}
</style>
