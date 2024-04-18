import VueKonva from 'vue-konva';

export default defineNuxtPlugin((nuxtApp) => {
  // https://konvajs.org/docs/
  nuxtApp.vueApp.use(VueKonva);
});
