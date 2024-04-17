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
