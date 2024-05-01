<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <section v-if="pageVisible" id="prerequisities">
      <h2>III.I. {{ $t('nav.prerequisities') }}</h2>
      <p class="main-text">
        {{ $t('tutorial.prerequisities.intro') }}
      </p>
      <h3>Python</h3>
      <p class="main-text flex-row">
        {{ $t('tutorial.prerequisities.python') }}
        <a
          href="https://www.python.org/downloads/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline"
        >
          {{ $t('tutorial.prerequisities.pythonWebsite') }}.
        </a>
      </p>
      <p class="main-text mt-5">
        {{ $t('tutorial.prerequisities.newProject') }}
      </p>
      <CodeBlock language="bash" :code-snippet="NEW_PROJECT" />
      <h3>{{ $t('tutorial.prerequisities.venv') }}</h3>
      <p class="main-text">
        {{ $t('tutorial.prerequisities.venvText') }}
      </p>
      <CodeBlock language="bash" :code-snippet="VENV" />
      <h3>{{ $t('tutorial.prerequisities.pip') }}</h3>
      <li class="main-text">
        {{ $t('tutorial.prerequisities.pettingZoo') }}
      </li>
      <li class="main-text">
        {{ $t('tutorial.prerequisities.agileRL') }}
      </li>
      <li class="main-text">
        {{ $t('tutorial.prerequisities.pytorch') }}
      </li>
      <li class="main-text">
        {{ $t('tutorial.prerequisities.pythonDotenv') }}
      </li>
      <CodeBlock language="bash" :code-snippet="PIP_INSTALL" />
      <section id="projectStructure">
        <h3>{{ $t('nav.projectStructure') }}</h3>
        <p class="main-text">
          {{ $t('tutorial.projectStructure.intro') }}
        </p>
        <CodeBlock :code-snippet="PROJECT_STRUCTURE" />
      </section>
      <NextButton :on-click="() => $router.push(localePath('/tutorial/environment'))" />
    </section>
  </transition>
</template>

<script setup lang="ts">
import { VENV, PIP_INSTALL, NEW_PROJECT, PROJECT_STRUCTURE } from '~/constants';
const localePath = useLocalePath();

const pageVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    pageVisible.value = true;
  }, 100);
});
</script>
