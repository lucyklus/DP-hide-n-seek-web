<template>
  <div class="border-b border-dashed border-white w-full">
    <p class="text-sm mt-5">{{ title }}</p>
    <p class="w-full min-h-7 bg-base text-grey rounded-md mt-1" v-html="value"></p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
