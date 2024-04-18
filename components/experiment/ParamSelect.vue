<template>
  <div>
    <p class="text-sm mt-5">{{ name }}:</p>
    <select class="w-48 h-7 bg-base text-grey rounded-md mt-1" @change="(v) => $emit('modelValue:update', v.target)">
      <option v-for="{ label, value } in options" :key="value" :selected="value === modelValue" :value="value">
        {{ label }}
      </option>
    </select>
    <hr />
  </div>
</template>

<script lang="ts" setup>
import type { SelectOption } from '~/types';

defineEmits(['modelValue:update']);

defineProps({
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<SelectOption<any>[]>,
    required: true,
  },
});
</script>
