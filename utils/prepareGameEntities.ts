import type Konva from 'konva';
import type { ExperimentConfig, GameState, HiderRewards, SeekerRewards } from '~/types';

export const prepareGameEntities = (gameConfig: ExperimentConfig) => {
  const hiders: Record<string, Konva.ImageConfig> = {};
  const hidersNames: Record<string, Konva.TextConfig> = {};
  const seekers: Record<string, Konva.ImageConfig> = {};
  const seekersNames: Record<string, Konva.TextConfig> = {};
  const walls: Konva.ImageConfig[] = [];
  const visibilities: Record<string, Konva.CircleConfig> = {};
  let gameState: GameState | null = null;
  let hidingTime: number = 0;
  let seekingTime: number = 0;
  let hidersN: number = 0;
  let seekersN: number = 0;
  let visibilityRadius: number = 0;

  const images = getImages();

  const resetGameState = (seekersN: number, hidersN: number) => {
    const foundDucks: Record<string, string | null> = {};
    const hiderRewards: Record<string, HiderRewards> = {};
    for (let i = 0; i < hidersN; i++) {
      foundDucks[`hider_${i}`] = null;
      hiderRewards[`hider_${i}`] = {
        time_reward: 0,
        next_to_wall_reward: 0,
        hidden_reward: 0,
        discovery_penalty: 0,
      };
    }

    const seekerRewards: Record<string, SeekerRewards> = {};
    for (let i = 0; i < seekersN; i++) {
      seekerRewards[`seeker_${i}`] = {
        time_reward: 0,
        discovery_reward: 0,
        discovery_penalty: 0,
      };
    }
    return {
      frameNumber: 0,
      winnerTeam: null,
      foundDucks,
      rewards: {
        hiders: hiderRewards,
        hiders_total_reward: 0,
        hiders_total_penalty: 0,
        seekers: seekerRewards,
        seekers_total_reward: 0,
        seekers_total_penalty: 0,
      },
    };
  };

  const wallPositions: Record<string, [number, number][]> = {
    m1: [
      [0, 3],
      [2, 3],
      [3, 0],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 6],
      [4, 3],
      [6, 3],
    ],
    m2: [
      [1, 1],
      [1, 2],
      [1, 4],
      [1, 5],
      [2, 1],
      [2, 5],
      [3, 3],
      [4, 1],
      [4, 5],
      [5, 1],
      [5, 2],
      [5, 4],
      [5, 5],
    ],
    m3: [
      [1, 2],
      [1, 4],
      [2, 1],
      [2, 5],
      [3, 3],
      [4, 1],
      [4, 5],
      [5, 2],
      [5, 4],
    ],
    m4: [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 6],
      [2, 0],
      [2, 2],
      [2, 4],
      [2, 6],
      [3, 0],
      [3, 6],
      [4, 0],
      [4, 2],
      [4, 4],
      [4, 6],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 6],
    ],
  };

  const createWalls = (positions: [number, number][]) => {
    positions.forEach(([x, y]) =>
      walls.push({
        image: images.wall,
        width: 100,
        height: 100,
        x: x * 100,
        y: y * 100,
      }),
    );
  };

  createWalls(wallPositions[gameConfig.map] || []);

  const configDetails = {
    c1: { hidingTime: 50, seekingTime: 50, hidersN: 2, seekersN: 2, visibilityRadius: 2 },
    c2: { hidingTime: 50, seekingTime: 70, hidersN: 2, seekersN: 3, visibilityRadius: 1 },
    c3: { hidingTime: 60, seekingTime: 90, hidersN: 4, seekersN: 2, visibilityRadius: 2 },
  };

  const createSeekersAndHiders = (seekersN: number, hidersN: number) => {
    for (let i = 0; i < seekersN; i++) {
      seekers[`seeker_${i}`] = {
        image: images.seekerFront,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      };
      visibilities[`seeker_${i}`] = {
        x: 0,
        y: 0,
        radius: visibilityRadius * 100 + 50,
        visible: false,
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndRadius: visibilityRadius * 100 + 50,
        fillRadialGradientColorStops: [0, 'yellow', 1, '#00000000'],
      };
      seekersNames[`seeker_${i}`] = {
        x: 20,
        y: -12,
        text: `seeker_${i}`,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'turquoise',
      };
    }

    for (let i = 0; i < hidersN; i++) {
      hiders[`hider_${i}`] = {
        image: images.duckFront,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      };
      hidersNames[`hider_${i}`] = {
        x: 20,
        y: 10,
        text: `hider_${i}`,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'orange',
      };
    }
  };

  hidingTime = configDetails[gameConfig.config].hidingTime;
  seekingTime = configDetails[gameConfig.config].seekingTime;
  hidersN = configDetails[gameConfig.config].hidersN;
  seekersN = configDetails[gameConfig.config].seekersN;
  visibilityRadius = configDetails[gameConfig.config].visibilityRadius;
  gameState = resetGameState(seekersN, hidersN);
  createSeekersAndHiders(seekersN, hidersN);

  return {
    hiders,
    seekers,
    walls,
    visibilities,
    hidingTime,
    seekingTime,
    hidersN,
    seekersN,
    visibilityRadius,
    gameState,
    hidersNames,
    seekersNames,
  };
};
