<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <div v-if="pageVisible">
      <h1>IV. {{ $t('nav.furtherReading') }}</h1>
      <p class="main-text">
        {{ $t('furtherReading.introduction') }}
      </p>
      <ul class="ml-5 my-2 list-disc">
        <li>
          <a class="a-link" target="_blank" href="https://pettingzoo.farama.org/">PettingZoo</a>
        </li>
        <li><a class="a-link" target="_blank" href="https://docs.agilerl.com/en/latest/">AgileRL</a></li>
        <li>
          <a class="a-link" target="_blank" href="https://www.marl-book.com/">{{ $t('furtherReading.marlBook') }}</a>
        </li>
        <li>
          <a class="a-link" target="_blank" href="https://github.com/TimeBreaker/MARL-resources-collection">{{
            $t('furtherReading.marlResourcesCollection')
          }}</a>
        </li>
        <li>
          <a class="a-link" target="_blank" href="https://github.com/TimeBreaker/MARL-papers-with-code">{{
            $t('furtherReading.marlPapersWithCode')
          }}</a>
        </li>
        <li>
          <a class="a-link" target="_blank" href="https://github.com/instadeepai/awesome-marl?tab=readme-ov-file"
            >Awesome MARL</a
          >
        </li>
      </ul>
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
