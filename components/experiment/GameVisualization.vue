<template>
  <div>
    <p class="main-text">
      {{ $t('experiments.visualization.intro') }} <br />
      {{ $t('experiments.visualization.explanation.part1') }}
      <span class="purple-text">{{ $t('experiments.visualization.explanation.part2') }}</span
      >: {{ $t('experiments.visualization.explanation.part3') }} <br /><br />

      {{ $t('experiments.visualization.explanation2.part1') }}
      <span class="purple-text">{{ $t('experiments.visualization.explanation2.part2') }}</span
      >. {{ $t('experiments.visualization.explanation2.part3') }}
      <span class="purple-text">{{ $t('experiments.visualization.explanation2.part4') }}</span
      >. {{ $t('experiments.visualization.explanation2.part5') }}
      <span class="purple-text">{{ $t('experiments.visualization.explanation2.part6') }}</span>
      {{ $t('experiments.visualization.explanation2.part7') }}
      <span class="purple-text">{{ $t('experiments.visualization.explanation2.part8') }}</span>
      {{ $t('experiments.visualization.explanation2.part9') }} <br /><br />

      {{ $t('experiments.visualization.explanation3') }}
    </p>
    <h2 class="mt-10">{{ $t('experiments.visualization.interactiveVisualization') }}</h2>
    <h3 class="text-white underline underline-offset-8">{{ $t('experiments.visualization.hyperparameters.title') }}</h3>
    <div class="flex flex-row gap-10">
      <ExperimentParamSelect
        v-model="selectedAlgorithm"
        :name="$t('experiments.visualization.hyperparameters.algorithm')"
        :options="algorithmOptions"
      />
      <ExperimentParamSelect
        v-model="selectedMap"
        :name="$t('experiments.visualization.hyperparameters.map')"
        :option="config.map"
        :options="mapOptions"
      />
      <ExperimentParamSelect
        v-model="selectedConfig"
        :name="$t('experiments.visualization.hyperparameters.config')"
        :options="configOptions"
      />
      <ExperimentParamSelect
        v-model="selectedEpisode"
        :name="$t('experiments.visualization.hyperparameters.episodeNumber')"
        :options="episodeOptions"
      />
    </div>
    <!-- Static values: -->
    <div class="flex flex-row gap-10">
      <ExperimentParamValue
        :title="$t('experiments.visualization.hyperparameters.hidingSeekingTime')"
        :value="`${gameEntities.hidingTime}s/${gameEntities.seekingTime}s`"
      />
      <ExperimentParamValue
        :title="$t('experiments.visualization.hyperparameters.numberOfHiders')"
        :value="gameEntities.hidersN.toString()"
      />
      <ExperimentParamValue
        :title="$t('experiments.visualization.hyperparameters.numberOfSeekers')"
        :value="gameEntities.seekersN.toString()"
      />
      <ExperimentParamValue
        :title="$t('experiments.visualization.hyperparameters.seekersRadius')"
        :value="gameEntities.visibilityRadius.toString()"
      />
    </div>
    <!-- TODO: Loader -->
    <div v-if="state === 'visualization' && selectedEpisode != null">
      <div class="flex gap-10">
        <!-- Game visualization -->
        <div>
          <div class="bg-[#393d3e] w-[700px] h-[30px] text-[#777b7c] text-sm font-bold mt-5 text-center content-center">
            {{ $t('experiments.visualization.episode') }} {{ selectedEpisode }}
          </div>
          <div class="w-[700px] h-[700px]" :class="[hidingPart ? 'bg-white' : 'bg-black']">
            <v-stage :config="{ width: 700, height: 700 }">
              <!-- Visibility radius circles -->
              <v-layer>
                <v-circle v-for="(circle, name) in visibilities" :key="name" :config="circle"></v-circle>
              </v-layer>
              <!-- Seekers & hiders with names-->
              <v-layer>
                <v-text v-for="(conf, name) in hidersNames" :key="name" :config="conf"></v-text>
                <v-text v-for="(conf, name) in seekersNames" :key="name" :config="conf"></v-text>
                <v-image v-for="(conf, name) in seekers" :key="name" :config="conf"></v-image>
                <v-image v-for="(conf, name) in hiders" :key="name" :config="conf"></v-image>
              </v-layer>
              <!-- Walls -->
              <v-layer>
                <v-image v-for="(conf, index) in walls" :key="index" :config="conf"></v-image>
              </v-layer>
            </v-stage>
          </div>
        </div>
        <!-- Game state -->
        <div class="flex flex-col justify-between h-[700px] mt-2 w-full">
          <ExperimentGameState
            v-if="gameState"
            v-model:playing-speed="playingSpeed"
            :game-state="gameState"
            :hiders-n="gameEntities.hidersN"
            :seekers-n="gameEntities.seekersN"
          />
          <!-- Buttons play/pause/restart -->
          <div class="flex gap-3 items-end mt-5">
            <!-- Play/pause button -->
            <button
              class="bg-primary text-white rounded-full border-2 border-white w-10 h-10"
              @click="playing ? pause() : play()"
            >
              <Icon v-if="!playing" name="ph:play-fill" />
              <Icon v-if="playing" name="ic:round-pause" />
            </button>
            <!-- Restart button -->
            <button class="bg-primary text-white rounded-full border-2 border-white w-10 h-10" @click="restart">
              <Icon name="codicon:debug-restart" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <ExperimentGameDescription />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Konva from 'konva';
import type {
  AlgorithmType,
  ConfigType,
  ExperimentConfig,
  ExperimentData,
  GameState,
  MapType,
  SelectOption,
} from '~/types';
import { Movement, AgentType } from '~/types';
import { algorithmOptions, configOptions, mapOptions } from '~/constants';

const props = defineProps({
  config: {
    type: Object as PropType<ExperimentConfig>,
    required: true,
  },
});

const selectedEpisode = ref<number | null>(null);
const episodeOptions = ref<SelectOption<number>[]>([]);

const images = getImages();

const selectedAlgorithm = ref<AlgorithmType>(props.config.algorithm);
const selectedMap = ref<MapType>(props.config.map);
const selectedConfig = ref<ConfigType>(props.config.config);

const state = ref<'config' | 'visualization'>('config');

onMounted(async () => {
  try {
    await getData();
  } catch (e) {
    console.error(e);
  }
});

const episodes = ref<ExperimentData | null>(null);
const getData = async () => {
  const queryParams = new URLSearchParams({
    algorithm: selectedAlgorithm.value,
    map: selectedMap.value,
    config: selectedConfig.value,
  });
  try {
    const data: ExperimentData = JSON.parse(await $fetch('/api/experiments?' + queryParams.toString()));
    selectedEpisode.value = data[0].number;
    episodeOptions.value = data.map<SelectOption<number>>((ep) => ({
      value: ep.number,
      label: `${ep.number}`,
    }));
    episodes.value = data;
    state.value = 'visualization';
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

const gameEntities = prepareGameEntities(props.config);
const hiders = ref<Record<string, Konva.ImageConfig>>(gameEntities.hiders);
const seekers = ref<Record<string, Konva.ImageConfig>>(gameEntities.seekers);
const walls = ref<Konva.RectConfig[]>(gameEntities.walls);
const visibilities = ref<Record<string, Konva.CircleConfig>>(gameEntities.visibilities);
const hidersNames = ref<Record<string, Konva.TextConfig>>(gameEntities.hidersNames);
const seekersNames = ref<Record<string, Konva.TextConfig>>(gameEntities.seekersNames);
const hidingTime = ref(gameEntities.hidingTime);
const hidingPart = ref(true);
watch(
  [selectedAlgorithm, selectedMap, selectedConfig, selectedEpisode],
  () => {
    const gameEntities = prepareGameEntities({
      algorithm: selectedAlgorithm.value,
      map: selectedMap.value,
      config: selectedConfig.value,
    });
    hiders.value = gameEntities.hiders;
    seekers.value = gameEntities.seekers;
    walls.value = gameEntities.walls;
    visibilities.value = gameEntities.visibilities;
    restart();
  },
  { deep: true },
);

watch([selectedAlgorithm, selectedMap, selectedConfig], async () => await getData(), { deep: true });

const playing = ref(false);

const canMove = (x: number, y: number) => {
  if (x < 0 || y < 0 || x > 600 || y > 600) {
    return false;
  }
  return !walls.value.some((wall) => wall.x === x && wall.y === y);
};

const getNewPosition = (
  x: number,
  y: number,
  move: Movement,
  agentType: AgentType,
): [number, number, HTMLImageElement] => {
  let newDirection = agentType === AgentType.HIDER ? images.duckFront : images.seekerFront;
  switch (move) {
    case Movement.LEFT:
      newDirection = agentType === AgentType.HIDER ? images.duckLeft : images.seekerLeft;
      if (canMove(x - 100, y)) {
        return [x - 100, y, newDirection];
      }
      break;
    case Movement.RIGHT:
      newDirection = agentType === AgentType.HIDER ? images.duckRight : images.seekerRight;
      if (canMove(x + 100, y)) {
        return [x + 100, y, newDirection];
      }
      break;
    case Movement.UP:
      newDirection = agentType === AgentType.HIDER ? images.duckBack : images.seekerBack;
      if (canMove(x, y - 100)) {
        return [x, y - 100, newDirection];
      }
      break;
    case Movement.DOWN:
      newDirection = agentType === AgentType.HIDER ? images.duckFront : images.seekerFront;
      if (canMove(x, y + 100)) {
        return [x, y + 100, newDirection];
      }
      break;
  }
  return [x, y, newDirection];
};

const lastFrame = ref(0);
const gameState = ref<GameState | null>(JSON.parse(JSON.stringify(gameEntities.gameState)));
const playingSpeed = ref(100);
const realAnimationSpeed = computed(() => 1000 / Math.pow(2, playingSpeed.value / 100));

const play = async () => {
  const episode = episodes.value?.find((ep) => ep.number === selectedEpisode.value);
  if (!episode || gameState.value === null) {
    return;
  }
  if (lastFrame.value === 0) {
    restart();
  }
  playing.value = true;
  for (let frameIndex = lastFrame.value; frameIndex < episode.frames.length; frameIndex++) {
    gameState.value.frameNumber = frameIndex;
    if (frameIndex >= hidingTime.value) {
      hidingPart.value = false;
    }
    const frame = episode.frames[frameIndex];

    for (const seeker in seekers.value) {
      if (hidingPart.value) {
        seekers.value[seeker].image = images.seekerFront;
        continue;
      }
      const newAction = frame.actions.seekers[seeker];
      const lastX = seekers.value[seeker].x!;
      const lastY = seekers.value[seeker].y!;
      const [newX, newY, newImage] = getNewPosition(lastX, lastY, newAction, AgentType.SEEKER);
      seekers.value[seeker].x = newX;
      seekers.value[seeker].y = newY;
      seekers.value[seeker].image = newImage;
      visibilities.value[seeker].x = newX + 50;
      visibilities.value[seeker].y = newY + 50;
      visibilities.value[seeker].visible = true;
      seekersNames.value[seeker].x = newX + 20;
      seekersNames.value[seeker].y = newY - 12;
    }

    for (const hider in hiders.value) {
      if (frame.found[hider]) {
        hiders.value[hider].image = images.duckFound;
        gameState.value.foundDucks[hider] = frame.found[hider];
        continue;
      }
      if (!hidingPart.value) {
        hiders.value[hider].image = images.duckFront;
        continue;
      }
      const newAction = frame.actions.hiders[hider];
      const lastX = hiders.value[hider].x!;
      const lastY = hiders.value[hider].y!;
      const [newX, newY, newImage] = getNewPosition(lastX, lastY, newAction, AgentType.HIDER);
      hiders.value[hider].x = newX;
      hiders.value[hider].y = newY;
      hiders.value[hider].image = newImage;
      hidersNames.value[hider].x = newX + 20;
      hidersNames.value[hider].y = newY + 10;
    }
    await new Promise((resolve) => setTimeout(resolve, realAnimationSpeed.value));

    if (!playing.value) {
      lastFrame.value = frameIndex;
      return;
    }
  }
  lastFrame.value = 0;
  playing.value = false;

  // Winner stats
  if (episode.frames[episode.frames.length - 1].won.seekers) {
    gameState.value.winnerTeam = AgentType.SEEKER;
  } else {
    gameState.value.winnerTeam = AgentType.HIDER;
  }
  gameState.value.rewards = episode.rewards;
};

const pause = () => {
  playing.value = false;
};

const restart = () => {
  console.log('restart');
  playing.value = false;
  lastFrame.value = 0;
  hidingPart.value = true;
  gameState.value = JSON.parse(JSON.stringify(gameEntities.gameState));
  for (const hider in hiders.value) {
    hiders.value[hider].x = 0;
    hiders.value[hider].y = 0;
    hiders.value[hider].image = images.duckFront;
    hidersNames.value[hider].x = 20;
    hidersNames.value[hider].y = 10;
  }
  for (const seeker in seekers.value) {
    seekers.value[seeker].x = 0;
    seekers.value[seeker].y = 0;
    seekers.value[seeker].image = images.seekerFront;
    visibilities.value[seeker].visible = false;
    seekersNames.value[seeker].x = 20;
    seekersNames.value[seeker].y = -12;
  }
};
</script>
