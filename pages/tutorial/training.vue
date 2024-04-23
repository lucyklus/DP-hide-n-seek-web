<template>
  <section id="training">
    <h2>III.III. {{ $t('nav.training') }}</h2>
    <h3>train.py</h3>
    <p class="main-text">
      This part is the core of our hide-and-seek game, where the magic of training happens. It handles everything from
      setting up the game environment, training the agents using advanced algorithms like MADDPG or MATD3, to logging
      results for analysis. This script is key to improving the agents' strategies over time, ensuring they learn
      effectively from each game played.
    </p>
    <CodeBlock language="python" :code-snippet="TRAINING_LOOP" />
    <h3>utils/config</h3>
    <p class="main-text">
      The hyperparameters and configurations for training are stored in a separate file to make it easier to manage and
      experiment with different settings. This file contains the Configuration class, which is used to load the
      hyperparameters from the .env file.
    </p>
    <CodeBlock language="python" :code-snippet="TRAINING_CONFIG" />
    <h3>.env</h3>
    <p class="main-text">
      The .env file is used to store environment variables that are used to configure the training process. This file is
      used to store hyperparameters and other configurations that can be easily modified without changing the code.
    </p>
    <CodeBlock :code-snippet="CONFIG_ENV" />
    <NextButton :on-click="() => router.push('/tutorial/main')" />
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { TRAINING_LOOP, TRAINING_CONFIG, CONFIG_ENV } from '~/constants';

const router = useRouter();
</script>
