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
    <NextButton :on-click="() => router.push('/tutorial/training')" />
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ENV_MODELS, ENV_HIDENSEEK } from '~/constants';

const router = useRouter();
</script>
