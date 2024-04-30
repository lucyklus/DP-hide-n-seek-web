import { createClient } from '@supabase/supabase-js';
import { ExperimentConfig } from '~/types';

const appConfig = useRuntimeConfig();

export const useExperimentService = () => {
  const supabase = createClient(appConfig.supabaseUrl, appConfig.supabaseKey);

  const getExperiment = async (config: ExperimentConfig) => {
    const { data, error } = await supabase.storage
      .from('episodes')
      .download(`${config.algorithm}/${config.map}/${config.config}/1.json`);
    if (error) {
      console.error('Error downloading file: ', error.message);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
    return data;
  };

  return {
    getExperiment,
  };
};
