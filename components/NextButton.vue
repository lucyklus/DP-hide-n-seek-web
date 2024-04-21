<template>
  <button
    class="text-white font-bold py-2 px-4 rounded w-full my-10"
    :class="[disabled ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-primary']"
    @click="onClick()"
  >
    Next
  </button>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
  },
  onClick: {
    type: Function,
    required: true,
  },
});
</script>
