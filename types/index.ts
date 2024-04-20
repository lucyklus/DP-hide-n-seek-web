export type SelectOption<T> = {
  value: T;
  label: string;
};

export type AlgorithmType = 'MADDPG' | 'MATD3';
// m1 - Crossroad, m2-BoxedLabyrinthm, m3-InnerCircle, m4-Patchwork, m5-OpenField
export type MapType = 'm1' | 'm2' | 'm3' | 'm4' | 'm5';
// c1 - BalancedClassic, c2 - StealthAndPursuit, c3 - EnduranceHideout
export type ConfigType = 'c1' | 'c2' | 'c3';
export type ExperimentConfig = {
  algorithm: AlgorithmType;
  map: MapType;
  config: ConfigType;
};

export enum AgentType {
  HIDER,
  SEEKER,
}

export type HiderRewards = {
  time_reward: number;
  next_to_wall_reward: number;
  hidden_reward: number;
  discovery_penalty: number;
};

export type SeekerRewards = {
  time_reward: number;
  discovery_reward: number;
  discovery_penalty: number;
};

export type Rewards = {
  hiders: { [key: string]: HiderRewards };
  hiders_total_reward: number;
  hiders_total_penalty: number;
  seekers: { [key: string]: SeekerRewards };
  seekers_total_reward: number;
  seekers_total_penalty: number;
};

export enum Movement {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3,
  STAY = 4,
}

export type Frame = {
  actions: { hiders: { [key: string]: Movement }; seekers: { [key: string]: Movement } };
  won: { [key: string]: boolean };
  found: { [key: string]: string };
};

export type EpisodeData = {
  number: number;
  rewards: Rewards;
  frames: Array<Frame>;
};

export type GameState = {
  frameNumber: number;
  winnerTeam: AgentType | null;
  foundDucks: { [key: string]: string | null };
  rewards: Rewards;
};

export type ExperimentData = EpisodeData[];
