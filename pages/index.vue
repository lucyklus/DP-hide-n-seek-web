<template>
  <transition
    name="fade-page"
    mode="out-in"
    enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isVisible" class="flex flex-col h-screen justify-center">
      <canvas id="bg-anim" class="absolute w-screen h-screen opacity-50"></canvas>
      <div class="flex items center gap-4 justify-center z-10">
        <img src="/img/duck.png" width="150" height="150" />
        <p class="text-quartiary text-9xl">QUACK</p>
        <img src="/img/programmer.png" width="160" height="160" />
      </div>
      <div class="flex justify-center">
        <button class="bg-primary px-20 py-5 mt-5 z-10" @click="navigate">
          <p class="text-base text-lg font-bold">ASK THE DUCK</p>
        </button>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
});

const router = useRouter();
const isVisible = ref(true);

const navigate = () => {
  isVisible.value = false;
  setTimeout(() => {
    router.push('/introduction');
  }, 500);
};

const ctx = ref<CanvasRenderingContext2D | null>(null);
const duckImg = ref<HTMLImageElement | null>(null);

onMounted(() => {
  const canvas = document.getElementById('bg-anim') as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.value = canvas.getContext('2d') as CanvasRenderingContext2D;

  duckImg.value = new Image();
  duckImg.value.src = '/img/duck.png';

  startAnimation();
});

interface Duck {
  x: number;
  y: number;
  size: number;
  speed: number;
}

const DUCK_COUNT = 20;
const ducks = ref<Duck[]>([]);
const startAnimation = () => {
  if (!duckImg.value) return;
  duckImg.value.onload = () => {
    const _ducks: Duck[] = [];
    for (let i = 0; i < DUCK_COUNT; i++) {
      _ducks.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 50 + 50,
        speed: Math.random() * 5 + 1,
      });
    }
    ducks.value = _ducks;
    animate();
  };
};

const animate = () => {
  if (!ctx.value || !duckImg.value) return;
  ctx.value.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ducks.value.forEach((duck) => {
    ctx.value!.drawImage(duckImg.value!, duck.x, duck.y, duck.size, duck.size);
    duck.y -= duck.speed;
    if (duck.y < -50) {
      duck.y = window.innerHeight;
      duck.x = Math.random() * window.innerWidth;
      duck.size = Math.random() * 50 + 50;
    }
  });
  requestAnimationFrame(animate);
};
</script>
