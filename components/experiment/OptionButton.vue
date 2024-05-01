<template>
  <div
    class="box-border cursor-pointer rounded border-4"
    :class="[hovering || selected ? 'border-[#7e22ce]' : 'border-transparent']"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <img :src="imgSrc" :alt="text" width="400" height="400" class="rounded-md" />
    <p class="text-center mt-2">{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const hovering = ref(false);
</script>
