<template>
  <section id="main">
    <h2>III.IV. {{ $t('nav.main') }}</h2>
    <h3>main.py</h3>
    <p class="main-text">
      {{ $t('tutorial.main.mainpy') }}
    </p>
    <CodeBlock language="python" :code-snippet="MAIN" />
    <h3>walls_configs.json</h3>
    <p class="main-text">
      {{ $t('tutorial.main.wallsConfigs') }}
    </p>
    <CodeBlock language="json" :code-snippet="WALLS_CONFIG" />
  </section>
</template>

<script lang="ts" setup>
import { MAIN, WALLS_CONFIG } from '~/constants';
</script>
