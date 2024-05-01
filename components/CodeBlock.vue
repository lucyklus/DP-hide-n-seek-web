<template>
  <div class="rounded-md overflow-hidden mt-5">
    <div class="bg-gray-200 text-gray-700 p-2 flex justify-between items-center font-sans">
      <p class="text-lg font-bold">{{ language }}</p>
      <button class="bg-transparent border-none text-gray-700 cursor-pointer" @click="copyCode">
        <Icon :name="isCopied ? 'bi:clipboard-check' : 'bi:clipboard'" :color="isCopied ? 'green' : 'black'" />
      </button>
    </div>
    <div class="bg-codeBlock px-2 py-4 text-xs md:text-base overflow-x-auto">
      <Shiki :lang="language" :code="codeSnippet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BundledLanguage } from 'shiki';

const props = defineProps({
  language: {
    type: String as PropType<BundledLanguage>,
    default: undefined,
  },
  codeSnippet: {
    type: String,
    required: true,
  },
});
const isCopied = ref(false);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.codeSnippet);
    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 3000);
  } catch (err) {
    console.error('Failed to copy code to clipboard', err);
    isCopied.value = false;
  }
};
</script>
