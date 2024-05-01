<template>
  <div>
    <h3 class="text-white underline underline-offset-8">{{ $t('experiments.visualization.gameState.title') }}</h3>
    <div>
      <ExperimentPlayingSpeedSlider
        :model-value="props.playingSpeed"
        @update:model-value="(val) => $emit('update:playingSpeed', val)"
      />
      <!-- Frame number -->
      <ExperimentParamValue
        :title="$t('experiments.visualization.gameState.frame')"
        :value="gameState.frameNumber.toString()"
      />
      <!-- Found ducks -->
      <ExperimentParamValue :title="$t('experiments.visualization.gameState.foundDucks')" :value="getFoundDucks()" />
      <!-- Winner team -->
      <ExperimentParamValue :title="$t('experiments.visualization.gameState.winnerTeam')" :value="getWinnerTeam()" />
    </div>

    <!-- Rewards -->
    <div class="flex justify-between gap-10">
      <!-- Hiders: -->
      <div class="flex flex-col w-full">
        <ExperimentParamSelect
          v-model="selectedHiderReward"
          :name="$t('experiments.visualization.gameState.hidersRewards')"
          :options="hiderRewardOptions"
          :dont-translate="true"
        />
        <!-- Totals -->
        <template v-if="selectedHiderReward === 'totals'">
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.totalReward')"
            :value="gameState.rewards.hiders_total_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.totalPenalty')"
            :value="gameState.rewards.hiders_total_penalty.toString()"
          />
        </template>
        <template v-else>
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.timeReward')"
            :value="gameState.rewards.hiders[selectedHiderReward].time_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.nextToWallReward')"
            :value="gameState.rewards.hiders[selectedHiderReward].next_to_wall_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.hiddenReward')"
            :value="gameState.rewards.hiders[selectedHiderReward].hidden_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.discoveryPenalty')"
            :value="gameState.rewards.hiders[selectedHiderReward].discovery_penalty.toString()"
          />
        </template>
      </div>
      <!-- Seekers: -->
      <div class="flex flex-col w-full">
        <ExperimentParamSelect
          v-model="selectedSeekerReward"
          :name="$t('experiments.visualization.gameState.seekersRewards')"
          :options="seekerRewardOptions"
          :dont-translate="true"
        />
        <!-- Totals reward -->
        <template v-if="selectedSeekerReward === 'totals'">
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.totalReward')"
            :value="gameState.rewards.seekers_total_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.totalPenalty')"
            :value="gameState.rewards.seekers_total_penalty.toString()"
          />
        </template>
        <template v-else>
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.timeReward')"
            :value="gameState.rewards.seekers[selectedSeekerReward].time_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.discoveryReward')"
            :value="gameState.rewards.seekers[selectedSeekerReward].discovery_reward.toString()"
          />
          <ExperimentParamValue
            :title="$t('experiments.visualization.gameState.discoveryPenalty')"
            :value="gameState.rewards.seekers[selectedSeekerReward].discovery_penalty.toString()"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { AgentType, type GameState } from '~/types';

defineEmits(['update:playingSpeed']);

const props = defineProps({
  gameState: {
    type: Object as PropType<GameState>,
    required: true,
  },
  hidersN: {
    type: Number,
    required: true,
  },
  seekersN: {
    type: Number,
    required: true,
  },
  playingSpeed: {
    type: Number,
    required: true,
  },
});

const hiderRewardOptions = [{ value: 'totals', label: 'Totals' }];
for (let i = 0; i < props.hidersN; i++) {
  hiderRewardOptions.push({ value: `hider_${i}`, label: `Hider ${i}` });
}

const seekerRewardOptions = [{ value: 'totals', label: 'Totals' }];
for (let i = 0; i < props.seekersN; i++) {
  seekerRewardOptions.push({ value: `seeker_${i}`, label: `Seeker ${i}` });
}

const selectedHiderReward = ref(hiderRewardOptions[0].value);
const selectedSeekerReward = ref(seekerRewardOptions[0].value);

const getWinnerTeam = () => {
  if (props.gameState.winnerTeam === null) return '-';
  return props.gameState.winnerTeam === AgentType.HIDER ? 'Hiders' : 'Seekers';
};

const getFoundDucks = () => {
  let result = '';
  for (const hider in props.gameState.foundDucks) {
    if (props.gameState.foundDucks[hider] === null) {
      continue;
    }
    result += `${hider}: ${props.gameState.foundDucks[hider]} <br>`;
  }
  if (result === '') {
    result = '-';
  }
  return result;
};
</script>
