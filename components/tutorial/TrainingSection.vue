<template>
  <section id="training">
    <h2>III.III. {{ $t('nav.training') }}</h2>
    <!-- TODO: texts -->
    <h3>train.py</h3>
    <CodeBlock language="python" :code-snippet="TRAINING_LOOP" />
    <h3>utils/config</h3>
    <CodeBlock language="python" :code-snippet="TRAINING_CONFIG" />
    <h3>.env</h3>
    <CodeBlock :code-snippet="CONFIG_ENV" />
  </section>
</template>

<script lang="ts" setup>
import { TRAINING_LOOP, TRAINING_CONFIG, CONFIG_ENV } from '~/constants';
</script>

<style></style>
