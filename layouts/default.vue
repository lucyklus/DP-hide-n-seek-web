<template>
  <div class="flex h-screen">
    <div class="w-1/5 bg-secondary p-4 flex flex-col">
      <nuxt-link to="/"> Home </nuxt-link>
      <nuxt-link to="/about"> About </nuxt-link>
      <nuxt-link to="/experiments"> Experiments </nuxt-link>
    </div>
    <div class="w-1/8">
      <div class="w-full bg-primary h-20" />
      <div class="p-20">
        <slot />
      </div>
    </div>
  </div>
</template>
