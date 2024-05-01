<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <div v-if="pageVisible">
      <span class="flex gap-2 items-center mb-4">
        <h1 class="border-b border-white">{{ $t('introduction.welcomeToQuack') }}</h1>
        <span id="duckling" title="What u looking at?!" />
      </span>
      <p class="main-text mb-4">
        {{ $t('introduction.intro') }}
      </p>

      <div class="flex justify-center">
        <img src="/img/quack.gif" alt="Duck gif" class="w-1/2" />
      </div>
      <p class="main-text my-4">
        {{ $t('introduction.diveInto') }}
      </p>
      <div id="contents" class="pb-10">
        <h2 class="underline">{{ $t('introduction.contents') }}</h2>
        <ul class="level-1">
          <li>
            <nuxt-link to="/experiments" class="flex items-center gap-2 w-1/2">
              {{ $t('nav.experiments') }}
              <div id="duck-container">
                <img id="duck-animation" src="/img/duck_right.png" alt="Duck" />
                <span id="interactive-text"> {{ $t('introduction.thisPartIsInteractive') }}</span>
              </div></nuxt-link
            >
          </li>
          <li class="mt-[-15px]">
            <nuxt-link to="/tutorial">{{ $t('nav.tutorial') }}</nuxt-link>
            <ul class="level-2">
              <li>
                <nuxt-link to="/tutorial/prerequisities">{{ $t('nav.prerequisities') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/tutorial/environment">{{ $t('nav.environment') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/tutorial/training">{{ $t('nav.training') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/tutorial/main">{{ $t('nav.main') }}</nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <nuxt-link to="/further-reading">{{ $t('nav.furtherReading') }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
const pageVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    pageVisible.value = true;
  }, 100);
});
</script>
<style scoped>
#duckling {
  @apply size-16;
  background-image: url('/img/duck_right.png');
  background-size: cover;
  &:hover {
    background-image: url('/img/duck.png');
  }
}

#contents {
  @apply mt-2;
  li {
    @apply underline cursor-pointer;
  }

  .level-1 {
    @apply list-disc pl-4;
    & > li > a {
      @apply text-white font-bold text-xl;
    }
  }

  .level-2 {
    @apply list-disc pl-4 text-lg;
  }
}

#duck-container {
  @apply whitespace-nowrap flex items-center relative;
}

#duck-animation {
  @apply relative z-10 will-change-transform;
  animation: slide-reveal 6s infinite;
}

#interactive-text {
  @apply absolute whitespace-nowrap opacity-0;
  animation: text-reveal 6s infinite;
}

@keyframes slide-reveal {
  0%,
  100% {
    transform: translateX(0px);
  }
  25%,
  75% {
    transform: translateX(240px);
  }
}

@keyframes text-reveal {
  0%,
  20%,
  100% {
    opacity: 0;
  }
  25%,
  75% {
    opacity: 1;
  }
}
</style>
