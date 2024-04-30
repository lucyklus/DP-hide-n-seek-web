import type { AlgorithmType, ConfigType, MapType, SelectOption } from '~/types';

export const algorithmOptions: SelectOption<AlgorithmType>[] = [
  { value: 'MADDPG', label: 'MADDPG' },
  { value: 'MATD3', label: 'MATD3' },
];

export const mapOptions: SelectOption<MapType>[] = [
  { value: 'm1', label: 'experiments.crossroad' },
  { value: 'm2', label: 'experiments.boxedLabyrinth' },
  { value: 'm3', label: 'experiments.innerCircle' },
  { value: 'm4', label: 'experiments.patchwork' },
  { value: 'm5', label: 'experiments.openField' },
];

export const configOptions: SelectOption<ConfigType>[] = [
  { value: 'c1', label: 'experiments.balancedClassic' },
  { value: 'c2', label: 'experiments.stealthAndPursuit' },
  { value: 'c3', label: 'experiments.enduranceHideout' },
];
