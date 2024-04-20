<template>
  <div class="border-b border-white">
    <p class="text-sm mt-5">{{ name }}:</p>
    <select class="w-48 h-7 bg-base text-grey rounded-md mt-1" @change="selectValue">
      <option :selected="!modelValue" disabled value="">Select {{ name }}</option>
      <option v-for="{ label, value } in options" :key="value" :selected="value === modelValue" :value="value">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup generic="T extends number | string">
import type { SelectOption } from '~/types';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  name: string;
  modelValue: T | null;
  options: SelectOption<T>[];
}>();

const selectValue = (e: Event) => {
  if (props.options.length === 0) return;
  const itemType = typeof props.options[0].value;
  const value = (e.target as HTMLSelectElement)!.value;
  emit('update:modelValue', itemType === 'string' ? value : Number(value));
};
</script>
