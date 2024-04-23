<template>
  <section id="main">
    <h2>III.IV. {{ $t('nav.main') }}</h2>
    <h3>main.py</h3>
    <p class="main-text">
      The main script is the entry point for our game, where the user can choose what option he wants to train. After he
      chooses the option, the training will start.
    </p>
    <CodeBlock language="python" :code-snippet="MAIN" />
    <h3>walls_configs.json</h3>
    <p class="main-text">
      The walls_configs.json file is used to store the configurations for the maps in the game. This file is used to
      define the position of the walls in the game environment, which can be easily modified without changing the code.
      The '1' specifies a wall, and the '0' specifies an empty space. All maps are 7x7.
    </p>
    <CodeBlock language="json" :code-snippet="WALLS_CONFIG" />
  </section>
</template>

<script lang="ts" setup>
import { MAIN, WALLS_CONFIG } from '~/constants';
</script>
