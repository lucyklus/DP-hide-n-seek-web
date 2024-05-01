<template>
  <div id="container" class="flex h-screen overflow-y-scroll">
    <div
      class="bg-secondary flex fixed flex-col h-screen z-20 transition-width"
      :class="{
        'w-52 p-4': sidebarOpen,
        'w-12 p-2': !sidebarOpen,
      }"
    >
      <span class="flex gap-4">
        <p v-if="sidebarOpen" class="text-4xl">QUACK</p>
        <button class="text-white text-3xl cursor-pointer pb-1" @click="toggleSidebar">
          <Icon :name="sidebarOpen ? 'bi:chevron-double-left' : 'bi:chevron-double-right'" />
        </button>
      </span>
      <div v-if="sidebarOpen && linksVisible" class="flex flex-col gap-2 mt-4">
        <nuxt-link class="main-link" :to="localePath('/introduction')">I. {{ $t('nav.introduction') }}</nuxt-link>
        <nuxt-link class="main-link" :to="localePath('/experiments')"> II. {{ $t('nav.experiments') }} </nuxt-link>
        <nuxt-link
          class="main-link"
          :to="localePath('/tutorial')"
          :class="{ 'underline !text-quartiary': isTutorialActive }"
        >
          III. {{ $t('nav.tutorial') }}
        </nuxt-link>
        <div class="ml-3 flex flex-col gap-2.5">
          <nuxt-link
            :class="{ 'sub-link-active': isActive('prerequisities') }"
            :to="localePath('/tutorial/prerequisities')"
          >
            III.I. {{ $t('nav.prerequisities') }}
          </nuxt-link>
          <nuxt-link :class="{ 'sub-link-active': isActive('environment') }" :to="localePath('/tutorial/environment')">
            III.II. {{ $t('nav.environment') }}
          </nuxt-link>
          <!-- training -->
          <nuxt-link :class="{ 'sub-link-active': isActive('training') }" :to="localePath('/tutorial/training')">
            III.III. {{ $t('nav.training') }}
          </nuxt-link>
          <nuxt-link :class="{ 'sub-link-active': isActive('main') }" :to="localePath('/tutorial/main')">
            III.IV. {{ $t('nav.main') }}
          </nuxt-link>
        </div>
        <nuxt-link class="main-link" :to="localePath('/further-reading')">
          IV. {{ $t('nav.furtherReading') }}
        </nuxt-link>
      </div>
      <!-- Footer -->
      <div v-if="sidebarOpen" class="absolute bottom-5 flex">
        <nuxt-link class="main-link" :to="switchLocalePath('en')">EN</nuxt-link>
        <p class="mx-1">|</p>
        <nuxt-link class="main-link" :to="switchLocalePath('sk')">SK</nuxt-link>
      </div>
    </div>
    <div>
      <div class="w-full bg-primary h-14 fixed cursor-pointer flex justify-end z-10">
        <img
          :src="duckSource"
          width="50"
          height="50"
          @mouseenter="changeImage(false)"
          @mouseleave="changeImage(true)"
          @click="$router.replace('/')"
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
          'pl-16 pr-4': isMobile,
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
const linksVisible = ref(true);
const duckSource = ref('/img/duck_right.png');

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
  sidebarOpen.value = !isMobile.value;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
    sidebarOpen.value = !isMobile.value;
  });
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

watch(sidebarOpen, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      linksVisible.value = true;
    }, 300);
  } else {
    linksVisible.value = false;
  }
});

const isActive = (subpage: string) => useRoute().path.split('/').includes(subpage);
const isTutorialActive = () => useRoute().path.includes('tutorial');
const changeImage = (revert: boolean) => {
  if (useRoute().path === '/introduction') {
    duckSource.value = revert ? '/img/duck_right.png' : '/img/duck_dead.png';
  }
};

const route = useRoute();

watch(
  () => route.path,
  () => {
    const container = document.getElementById('container');
    if (container) {
      container.scrollTo(0, 0);
    }
  },
);
</script>
<style>
.transition-width {
  transition: width 0.5s ease;
}
</style>
