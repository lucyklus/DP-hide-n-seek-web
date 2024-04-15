export type AlgorithmType = 'MADDPG' | 'MATD3';
export type MapType = 'Crossroad' | 'Boxed Labyrinth' | 'Inner Circle' | 'Patchwork' | 'Open Field';
export type ConfigType = 'Balanced Classic' | 'Stealth and Pursuit' | 'Endurance Hideout';
export type ExperimentConfig = {
  algorithm: AlgorithmType;
  map: MapType;
  config: ConfigType;
};
