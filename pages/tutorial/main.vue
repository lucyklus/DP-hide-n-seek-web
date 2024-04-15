<template>
  <section id="main">
    <h2>III.IV. {{ $t('nav.main') }}</h2>
    <!-- TODO: texts -->
    <h3>main.py</h3>
    <CodeBlock language="python" :code-snippet="MAIN" />
    <h3>walls_configs</h3>
    <CodeBlock language="python" :code-snippet="WALLS_CONFIG" />
  </section>
</template>

<script lang="ts" setup>
import { MAIN, WALLS_CONFIG } from '~/constants';
</script>
