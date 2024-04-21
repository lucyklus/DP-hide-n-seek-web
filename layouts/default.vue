<template>
  <div class="flex h-screen overflow-y-scroll">
    <div
      class="bg-secondary p-4 flex fixed flex-col h-screen z-10"
      :class="{
        'w-52': sidebarOpen,
        'w-4': !sidebarOpen,
      }"
    >
      <span class="flex gap-4 justify-center">
        <p v-if="sidebarOpen" class="text-4xl">QUACK</p>
        <button
          class="bg-transparent border-none text-white text-3xl cursor-pointer"
          @click="sidebarOpen = !sidebarOpen"
        >
          <Icon :name="sidebarOpen ? 'bi:chevron-double-left' : 'bi:chevron-double-right'" />
        </button>
      </span>
      <div v-if="sidebarOpen" class="flex flex-col gap-2 mt-4">
        <NuxtLink class="main-link" :to="localePath('/home')">I. {{ $t('nav.home') }}</NuxtLink>
        <NuxtLink class="main-link" :to="localePath('/experiments')"> II. {{ $t('nav.experiments') }} </NuxtLink>
        <NuxtLink class="main-link" :to="localePath('/tutorial')"> III. {{ $t('nav.tutorial') }} </NuxtLink>
        <div class="ml-3 flex flex-col gap-2.5">
          <NuxtLink
            :class="{ 'sub-link-active': isActive('prerequisities') }"
            :to="localePath('/tutorial/prerequisities')"
          >
            III.I. {{ $t('nav.prerequisities') }}
          </NuxtLink>
          <NuxtLink :class="{ 'sub-link-active': isActive('environment') }" :to="localePath('/tutorial/environment')">
            III.II. {{ $t('nav.environment') }}
          </NuxtLink>
          <!-- training -->
          <NuxtLink :class="{ 'sub-link-active': isActive('training') }" :to="localePath('/tutorial/training')">
            III.III. {{ $t('nav.training') }}
          </NuxtLink>
          <NuxtLink :class="{ 'sub-link-active': isActive('main') }" :to="localePath('/tutorial/main')">
            III.IV. {{ $t('nav.main') }}
          </NuxtLink>
        </div>
        <NuxtLink class="main-link" :to="localePath('/further-reading')"> IV. {{ $t('nav.furtherReading') }} </NuxtLink>
      </div>
      <!-- Footer -->
      <div v-if="sidebarOpen" class="absolute bottom-5 flex">
        <NuxtLink class="main-link" :to="switchLocalePath('en')">EN</NuxtLink>
        <p class="mx-1">|</p>
        <NuxtLink class="main-link" :to="switchLocalePath('sk')">SK</NuxtLink>
      </div>
    </div>
    <div>
      <div class="w-full bg-primary h-14 fixed cursor-pointer flex justify-end">
        <img
          :src="duckSource"
          width="50"
          height="50"
          @mouseenter="changeImage(false)"
          @mouseleave="changeImage(true)"
          @click="$router.replace('/home')"
        />
      </div>
    </div>
    <div
      v-if="sidebarOpen && isMobile"
      class="fixed w-screen h-screen bg-black bg-opacity-50"
      @click="sidebarOpen = false"
    ></div>
    <div class="w-full h-full">
      <div
        class="pt-20 h-full"
        :class="{
          'pl-64 pr-10': !isMobile && sidebarOpen,
          'pl-16 pr-10': !isMobile && !sidebarOpen,
          'pl-12 pr-4': isMobile,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const isMobile = ref(false);
const sidebarOpen = ref(!isMobile.value);
const duckSource = ref('/img/duck_right.png');

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
  sidebarOpen.value = !isMobile.value;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
    sidebarOpen.value = !isMobile.value;
  });
});

const isActive = (subpage: string) => useRoute().path.split('/').includes(subpage);
const changeImage = (revert: boolean) => {
  if (useRoute().path === '/home') {
    duckSource.value = revert ? '/img/duck_right.png' : '/img/duck_dead.png';
  }
};
</script>
