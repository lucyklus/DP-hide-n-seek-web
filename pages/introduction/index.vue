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
    <!-- TODO: gif -->
    <p class="main-text mb-4">
      So dive into the world of MARL, explore various algorithms, and watch as our agents learn and evolve through game
      strategies. Whether you are a seasoned programmer or new to the world of artificial intelligence, QUACK is the
      perfect place to witness multi-agent reinforcement learning in action.
    </p>
    <div id="contents">
      <h2 class="underline">Contents</h2>
      <ul class="level-1">
        <li>
          <router-link to="/experiments">Experiments</router-link>
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
      @apply text-white font-bold;
    }
  }

  .level-2 {
    @apply list-disc pl-4;
  }
}
</style>
