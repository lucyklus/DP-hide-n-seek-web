<template>
  <p class="text-sm mt-5">Player speed:</p>
  <div class="h-10 w-full mt-2">
    <input
      :value="modelValue"
      type="range"
      list="speeds"
      min="50"
      max="400"
      step="50"
      class="w-full"
      @input="changeSpeed"
    />
    <datalist id="speeds" class="flex w-full justify-between">
      <option value="50" label="0.5x" class="text-xs"></option>
      <option value="100" label="1x" class="text-xs"></option>
      <option value="150" label="1.5x" class="text-xs"></option>
      <option value="200" label="2x" class="text-xs"></option>
      <option value="250" label="2.5x" class="text-xs"></option>
      <option value="300" label="3x" class="text-xs"></option>
      <option value="350" label="3.5x" class="text-xs"></option>
      <option value="400" label="4x" class="text-xs"></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const emit = defineEmits(['update:modelValue']);
defineProps<{
  modelValue: number;
}>();

const changeSpeed = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', parseInt(target.value));
};
</script>

<style scoped>
input[type='range'] {
  accent-color: #9067c6;
}
</style>
