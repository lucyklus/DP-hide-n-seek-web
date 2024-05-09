<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <section v-if="pageVisible" id="prerequisites">
      <h2>III.I. {{ $t('nav.prerequisites') }}</h2>
      <p class="main-text">
        {{ $t('tutorial.prerequisites.intro') }}
      </p>
      <h3>Python</h3>
      <p class="main-text flex-row">
        {{ $t('tutorial.prerequisites.python') }}
        <a
          href="https://www.python.org/downloads/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline"
        >
          {{ $t('tutorial.prerequisites.pythonWebsite') }}.
        </a>
      </p>
      <p class="main-text mt-5">
        {{ $t('tutorial.prerequisites.newProject') }}
      </p>
      <CodeBlock language="bash" :code-snippet="NEW_PROJECT" />
      <h3>{{ $t('tutorial.prerequisites.venv') }}</h3>
      <p class="main-text">
        {{ $t('tutorial.prerequisites.venvText') }}
      </p>
      <CodeBlock language="bash" :code-snippet="VENV" />
      <h3>{{ $t('tutorial.prerequisites.pip') }}</h3>
      <li class="main-text">
        {{ $t('tutorial.prerequisites.pettingZoo') }}
      </li>
      <li class="main-text">
        {{ $t('tutorial.prerequisites.agileRL') }}
      </li>
      <li class="main-text">
        {{ $t('tutorial.prerequisites.pytorch') }}
      </li>
      <li class="main-text">
        {{ $t('tutorial.prerequisites.pythonDotenv') }}
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
