<template>
  <div class="border-b border-dashed border-white">
    <p class="text-sm mt-5">{{ title }}</p>
    <p class="w-48 h-7 bg-base text-grey rounded-md mt-1" p>
      {{ value }}
    </p>
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
