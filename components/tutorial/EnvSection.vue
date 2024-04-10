<template>
  <section id="environment">
    <h2>III.II. {{ $t('nav.environment') }}</h2>
    <!-- TODO: texts -->
    <h3>{{ $t('tutorial.environment.models') }}</h3>
    <p class="main-text">
      {{ $t('tutorial.environment.modelsText') }}
    </p>
    <CodeBlock language="python" :code-snippet="ENV_MODELS" />

    <h3>{{ $t('tutorial.environment.hidenseek') }}</h3>
    <p class="main-text">
      {{ $t('tutorial.environment.hidenseekText') }}
    </p>
    <CodeBlock language="python" :code-snippet="ENV_HIDENSEEK" />
  </section>
</template>

<script lang="ts" setup>
import { ENV_MODELS, ENV_HIDENSEEK } from '~/constants';
</script>

<style></style>
