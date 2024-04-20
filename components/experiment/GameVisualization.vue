<template>
  <div>
    <h3 class="text-white underline underline-offset-8">Hyperparameters</h3>
    <div class="flex flex-row gap-10">
      <ExperimentParamSelect v-model="selectedAlgorithm" name="Algorithm" :options="algorithmOptions" />
      <ExperimentParamSelect v-model="selectedMap" name="Map" :option="config.map" :options="mapOptions" />
      <ExperimentParamSelect v-model="selectedConfig" name="Config" :options="configOptions" />
      <ExperimentParamSelect v-model="selectedEpisode" name="Episode number" :options="episodeOptions" />
    </div>
    <!-- TODO: Loader -->
    <div v-if="state === 'visualization' && selectedEpisode != null">
      <!-- TODO: implement -->
      <div class="flex gap-10">
        <div>
          <div class="bg-[#393d3e] w-[700px] h-[30px] text-[#777b7c] text-sm font-bold mt-5 text-center content-center">
            Episode {{ selectedEpisode }}
          </div>
          <div class="w-[700px] h-[700px]" :class="[hidingPart ? 'bg-white' : 'bg-black']">
            <v-stage :config="{ width: 700, height: 730 }">
              <!-- Visibility radius circles -->
              <v-layer>
                <v-circle v-for="(circle, name) in visibilities" :key="name" :config="circle"></v-circle>
              </v-layer>
              <!-- Seekers & hiders -->
              <v-layer>
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
        <!-- Buttons previous/play/pause/next/restart -->
        <div class="flex justify-center mt-5 gap-3 items-end">
          <!-- Previous button -->
          <button class="bg-primary text-white rounded-full border-2 border-white w-10 h-10">
            <Icon name="ion:play-back" />
          </button>
          <!-- Play/pause button -->
          <button
            class="bg-primary text-white rounded-full border-2 border-white w-10 h-10"
            @click="playing ? pause() : play()"
          >
            <Icon v-if="!playing" name="ph:play-fill" />
            <Icon v-if="playing" name="ic:round-pause" />
          </button>
          <!-- Next button -->
          <button class="bg-primary text-white rounded-full border-2 border-white w-10 h-10">
            <Icon name="ion:play-forward" />
          </button>
          <!-- Restart button -->
          <button class="bg-primary text-white rounded-full border-2 border-white w-10 h-10" @click="restart">
            <Icon name="codicon:debug-restart" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Konva from 'konva';
import type { AlgorithmType, ConfigType, ExperimentConfig, ExperimentData, MapType, SelectOption } from '~/types';
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

// When agents rotate
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
  if (x < 0 || y < 0 || x >= 700 || y >= 700) {
    return false;
  }
  for (const wall of walls.value) {
    if (wall.x === x && wall.y === y) {
      return false;
    }
  }
  return true;
};

const getNewPosition = (x: number, y: number, move: Movement, agentType: AgentType) => {
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
const play = async () => {
  const episode = episodes.value?.find((ep) => ep.number === selectedEpisode.value);
  if (!episode) {
    return;
  }
  playing.value = true;
  for (let frameIndex = lastFrame.value; frameIndex < episode.frames.length; frameIndex++) {
    if (frameIndex > hidingTime.value) {
      hidingPart.value = false;
    }
    const frame = episode.frames[frameIndex];
    for (const hider in hiders.value) {
      const lastX = hiders.value[hider].x!;
      const lastY = hiders.value[hider].y!;
      if (frame.found[hider]) {
        hiders.value[hider].x = lastX;
        hiders.value[hider].y = lastY;
        hiders.value[hider].image = images.duckFound;
        continue;
      }
      if (frameIndex >= hidingTime.value) {
        hiders.value[hider].x = lastX;
        hiders.value[hider].y = lastY;
        hiders.value[hider].image = images.duckFront;
        continue;
      }
      const newAction = frame.actions.hiders[hider];
      const [newX, newY, newImage] = getNewPosition(lastX, lastY, newAction, AgentType.HIDER);
      hiders.value[hider].x = newX as number;
      hiders.value[hider].y = newY as number;
      hiders.value[hider].image = newImage as HTMLImageElement;
    }

    for (const seeker in seekers.value) {
      const lastX = seekers.value[seeker].x!;
      const lastY = seekers.value[seeker].y!;
      if (frameIndex <= hidingTime.value) {
        seekers.value[seeker].x = lastX;
        seekers.value[seeker].y = lastY;
        seekers.value[seeker].image = images.seekerFront;
        continue;
      }
      const newAction = frame.actions.seekers[seeker];
      const [newX, newY, newImage] = getNewPosition(lastX, lastY, newAction, AgentType.SEEKER);
      seekers.value[seeker].x = newX as number;
      seekers.value[seeker].y = newY as number;
      seekers.value[seeker].image = newImage as HTMLImageElement;
      visibilities.value[seeker].x = (newX as number) + 50;
      visibilities.value[seeker].y = (newY as number) + 50;
      visibilities.value[seeker].visible = true;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!playing.value) {
      lastFrame.value = frameIndex;
      return;
    }
  }
  lastFrame.value = 0;
  playing.value = false;
};

const pause = () => {
  playing.value = false;
};

const restart = () => {
  lastFrame.value = 0;
  playing.value = false;
  hidingPart.value = true;
  for (const hider in hiders.value) {
    hiders.value[hider].x = 0;
    hiders.value[hider].y = 0;
    hiders.value[hider].image = images.duckFront;
  }
  for (const seeker in seekers.value) {
    seekers.value[seeker].x = 0;
    seekers.value[seeker].y = 0;
    seekers.value[seeker].image = images.seekerFront;
    visibilities.value[seeker].visible = false;
  }
};
</script>
