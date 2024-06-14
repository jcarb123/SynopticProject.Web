<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Rive } from "@rive-app/webgl";

const canvas = ref<HTMLCanvasElement | null>(null);

const setupCanvas = () => {
  if (canvas.value) {
    const deviceWidth = window.innerWidth;

    if (deviceWidth <= 768) {
      canvas.value.width = 0;
      canvas.value.height = 0;
    } else if (deviceWidth <= 1024) {
      canvas.value.width = 0;
      canvas.value.height = 0;
    } else {
      canvas.value.width = 600;
      canvas.value.height = 400;
    }
  }
};

const setupAnimation = () => {
  if (canvas.value) {
    const rive = new Rive({
      canvas: canvas.value,
      src: "assets/hot_drink.riv",
      autoplay: true,
    });
    rive.speed = 0.5;
  }
};

onMounted(() => {
  setupCanvas();
  setupAnimation();
});
</script>
