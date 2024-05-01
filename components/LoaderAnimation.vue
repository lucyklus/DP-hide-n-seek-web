<template>
  <div class="flex items-center">
    <p class="font-bold text-3xl">Loading</p>
    <span class="flex mt-5">
      <img
        v-for="duck in ducks"
        :key="duck.id"
        :src="duck.src"
        :class="[
          'w-6 h-6 transition-opacity duration-500 ease-in-out',
          { 'opacity-100': duck.visible, 'opacity-0': !duck.visible },
        ]"
        alt="Duck"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
const ducks = ref([
  { id: 1, src: '/img/duck_right.png', visible: false },
  { id: 2, src: '/img/duck_right.png', visible: false },
  { id: 3, src: '/img/duck_right.png', visible: false },
]);

const toggleVisibility = (index: number) => {
  ducks.value.forEach((duck) => {
    duck.visible = false;
  });
  if (index < ducks.value.length) {
    ducks.value[index].visible = true;
  }
};

onMounted(() => {
  let index = 0;
  setInterval(() => {
    toggleVisibility(index);
    index = (index + 1) % (ducks.value.length + 1);
  }, 500);
});
</script>
