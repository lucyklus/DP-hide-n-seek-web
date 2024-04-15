<template>
  <div class="grid grid-cols-5 h-screen">
    <div class="bg-secondary p-4 flex flex-col fixed h-screen z-10">
      <p class="text-4xl mb-2.5">QUACK</p>
      <div class="flex flex-col gap-2">
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
      <div class="absolute bottom-5 flex">
        <NuxtLink class="main-link" :to="switchLocalePath('en')">EN</NuxtLink>
        <p class="mx-1">|</p>
        <NuxtLink class="main-link" :to="switchLocalePath('sk')">SK</NuxtLink>
      </div>
    </div>
    <div>
      <div class="w-full bg-primary h-14 fixed z-0 cursor-pointer">
        <img
          :src="duckSource"
          width="50"
          height="50"
          class="absolute right-5 self-center"
          @mouseenter="changeImage(false)"
          @mouseleave="changeImage(true)"
          @click="$router.push('home')"
        />
      </div>
    </div>
    <div class="col-span-4 w-full h-full ml-[1/4]">
      <div class="pt-20 pr-20 h-full">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const duckSource = ref('/img/duck_right.png');

const isActive = (subpage: string) => useRoute().path.split('/').includes(subpage);
const changeImage = (revert: boolean) => {
  if (useRoute().path === '/home') {
    duckSource.value = revert ? '/img/duck_right.png' : '/img/duck_dead.png';
  }
};
</script>
