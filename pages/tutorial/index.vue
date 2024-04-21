<template>
  <div>
    <h1>III. Tutorial</h1>
    <p class="main-text">
      {{ $t('tutorial.intro') }}
    </p>
    <NextButton :on-click="() => router.push('/tutorial/prerequisities')" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
