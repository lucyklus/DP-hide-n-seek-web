<template>
  <div>
    <span class="flex gap-2 items-center mb-4">
      <h1 class="border-b border-white">Welcome to QUACK</h1>
      <span id="duckling" title="What u looking at?!" />
    </span>
    <p class="main-text mb-4">
      QUACK is not just any educational tool; it aims at making complex reinforcement learning concepts approachable and
      fun. Inspired by the practice of 'rubber duck debugging' where programmers interrogate their rubber duck with
      questions, QUACK brings you a unique learning experience with hide-and-seek games featuring programmers and ducks.
    </p>

    <div class="flex justify-center">
      <img src="/img/quack.gif" alt="Duck gif" class="w-1/2" />
    </div>
    <p class="main-text my-4">
      So dive into the world of MARL, explore various algorithms, and watch as our agents learn and evolve through game
      strategies. Whether you are a seasoned programmer or new to the world of artificial intelligence, QUACK is the
      perfect place to witness multi-agent reinforcement learning in action.
    </p>
    <div id="contents" class="pb-10">
      <h2 class="underline">Contents</h2>
      <ul class="level-1">
        <li>
          <router-link to="/experiments" class="flex items-center gap-2 w-1/2">
            Experiments
            <div id="duck-container">
              <img id="duck-animation" src="/img/duck_right.png" alt="Duck" />
              <span id="interactive-text"> This part is interactive!</span>
            </div></router-link
          >
        </li>
        <li>
          <router-link to="/tutorial">Tutorial</router-link>
          <ul class="level-2">
            <li>
              <router-link to="/tutorial/prerequisities">Prerequisities</router-link>
            </li>
            <li>
              <router-link to="/tutorial/environment">Environment</router-link>
            </li>
            <li>
              <router-link to="/tutorial/training">Training</router-link>
            </li>
            <li>
              <router-link to="/tutorial/main">Main</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/further-reading">Further reading</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
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
    transform: translateX(220px);
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
