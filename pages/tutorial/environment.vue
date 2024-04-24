<template>
  <section id="environment">
    <h2>III.II. {{ $t('nav.environment') }}</h2>
    <h3>/environments/models.py</h3>
    <p class="main-text">
      {{ $t('tutorial.environment.modelsText') }}
    </p>
    <CodeBlock language="python" :code-snippet="ENV_MODELS" />

    <h3>environments/hidenseek.py</h3>
    <p class="main-text">
      {{ $t('tutorial.environment.hidenseekText') }}
    </p>
    <CodeBlock language="python" :code-snippet="ENV_HIDENSEEK" />
    <NextButton :on-click="() => $router.push(localePath('/tutorial/training'))" />
  </section>
</template>

<script lang="ts" setup>
import { ENV_MODELS, ENV_HIDENSEEK } from '~/constants';
const localePath = useLocalePath();
</script>
