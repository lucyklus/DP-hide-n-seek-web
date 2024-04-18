import type { AlgorithmType, ConfigType, MapType, SelectOption } from '~/types';

export const algorithmOptions: SelectOption<AlgorithmType>[] = [
  { value: 'MADDPG', label: 'MADDPG' },
  { value: 'MATD3', label: 'MATD3' },
];

export const mapOptions: SelectOption<MapType>[] = [
  { value: 'm1', label: 'Crossroad' },
  { value: 'm2', label: 'Boxed Labyrinth' },
  { value: 'm3', label: 'Inner Circle' },
  { value: 'm4', label: 'Patchwork' },
  { value: 'm5', label: 'Open Field' },
];

export const configOptions: SelectOption<ConfigType>[] = [
  { value: 'c1', label: 'Balanced Classic' },
  { value: 'c2', label: 'Stealth And Pursuit' },
  { value: 'c3', label: 'Endurance Hideout' },
];
