import { useExperimentService } from '~/server/services/experiments/service';
import { ExperimentConfig } from '~/types';

export default defineEventHandler((event) => {
  const eConfig = getQuery<ExperimentConfig>(event);
  const { getExperiment } = useExperimentService();
  return getExperiment(eConfig);
});
