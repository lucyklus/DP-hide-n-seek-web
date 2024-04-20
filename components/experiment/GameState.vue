<template>
  <div>
    <h3 class="text-white underline underline-offset-8">Game State</h3>
    <div>
      <!-- Frame number -->
      <ExperimentParamValue title="Frame:" :value="gameState.frameNumber.toString()" />
      <!-- Found ducks -->
      <ExperimentParamValue title="Found ducks:" :value="getFoundDucks()" />
      <!-- Winner team -->
      <ExperimentParamValue title="Winner team:" :value="getWinnerTeam()" />
    </div>

    <!-- Rewards -->
    <div class="flex justify-between gap-10">
      <!-- Hiders: -->
      <div class="flex flex-col w-full">
        <ExperimentParamSelect v-model="selectedHiderReward" name="Hiders' Rewards" :options="hiderRewardOptions" />
        <!-- Totals -->
        <template v-if="selectedHiderReward === 'totals'">
          <ExperimentParamValue title="Total reward:" :value="gameState.rewards.hiders_total_reward.toString()" />
          <ExperimentParamValue title="Total penalty:" :value="gameState.rewards.hiders_total_penalty.toString()" />
        </template>
        <template v-else>
          <ExperimentParamValue
            title="Time reward:"
            :value="gameState.rewards.hiders[selectedHiderReward].time_reward.toString()"
          />
          <ExperimentParamValue
            title="Next to wall reward:"
            :value="gameState.rewards.hiders[selectedHiderReward].next_to_wall_reward.toString()"
          />
          <ExperimentParamValue
            title="Hidden reward:"
            :value="gameState.rewards.hiders[selectedHiderReward].hidden_reward.toString()"
          />
          <ExperimentParamValue
            title="Discovery penalty:"
            :value="gameState.rewards.hiders[selectedHiderReward].discovery_penalty.toString()"
          />
        </template>
      </div>
      <!-- Seekers: -->
      <div class="flex flex-col w-full">
        <ExperimentParamSelect v-model="selectedSeekerReward" name="Seekers' Rewards" :options="seekerRewardOptions" />
        <!-- Totals reward -->
        <template v-if="selectedSeekerReward === 'totals'">
          <ExperimentParamValue title="Total reward:" :value="gameState.rewards.seekers_total_reward.toString()" />
          <ExperimentParamValue title="Total penalty:" :value="gameState.rewards.seekers_total_penalty.toString()" />
        </template>
        <!-- time_reward: 0,
        discovery_reward: 0,
        discovery_penalty: 0, -->
        <template v-else>
          <ExperimentParamValue
            title="Time reward:"
            :value="gameState.rewards.seekers[selectedSeekerReward].time_reward.toString()"
          />
          <ExperimentParamValue
            title="Discovery reward:"
            :value="gameState.rewards.seekers[selectedSeekerReward].discovery_reward.toString()"
          />
          <ExperimentParamValue
            title="Discovery penalty:"
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
  if (props.gameState.foundDucks === null) return '-';
  let result = '';
  for (const hider in props.gameState.foundDucks) {
    if (props.gameState.foundDucks[hider] === null) {
      continue;
    }
    result += `${hider}: ${props.gameState.foundDucks[hider]} <br>`;
  }
  return result;
};
</script>
