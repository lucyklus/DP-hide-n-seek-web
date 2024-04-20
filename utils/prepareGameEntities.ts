import type Konva from 'konva';
import type { ExperimentConfig, GameState, HiderRewards, SeekerRewards } from '~/types';

export const prepareGameEntities = (gameConfig: ExperimentConfig) => {
  const hiders: Record<string, Konva.ImageConfig> = {};
  const seekers: Record<string, Konva.ImageConfig> = {};
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

  // Walls
  if (gameConfig.map === 'm1') {
    const positions = [
      [0, 3],
      [2, 3],
      [3, 0],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 6],
      [4, 3],
      [6, 3],
    ];
    for (const [x, y] of positions) {
      walls.push({
        image: images.wall,
        width: 100,
        height: 100,
        x: x * 100,
        y: y * 100,
      });
    }
  }

  if (gameConfig.config === 'c1') {
    hidingTime = 50;
    seekingTime = 50;
    hidersN = 2;
    seekersN = 2;
    visibilityRadius = 2;
    gameState = resetGameState(seekersN, hidersN);
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
        radius: visibilityRadius * 100,
        visible: false,
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndRadius: visibilityRadius * 100,
        fillRadialGradientColorStops: [0, 'yellow', 1, '#00000000'],
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
    }
  }
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
  };
};
