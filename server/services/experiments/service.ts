import * as path from 'node:path';
import * as fs from 'node:fs';
import { ExperimentConfig } from '~/types';

export const useExperimentService = () => {
  const getExperiment = async (config: ExperimentConfig) => {
    const configPath = `server/data/${config.algorithm}/${config.map}/${config.config}`;
    const filePath = path.join(process.cwd(), configPath, '1.json');
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return data;
  };

  return {
    getExperiment,
  };
};
