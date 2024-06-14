<template>
  <header
    class="relative z-20 bg-cover h-52 flex flex-col justify-center items-center text-white border-b-2 border-white"
    :style="backgroundStyle"
  >
    <div class="absolute inset-0 bg-black bg-opacity-35"></div>
    <h1
      class="text-4xl md:text-5xl font-bold my-4 z-10 bg-white p-4 rounded-xl mix-blend-screen text-black text-center leading-relaxed"
    >
      Greggs Temperature <br />
      Monitoring
    </h1>
  </header>
</template>

<script setup lang="ts">
import backgroundImage from "@/assets/images/sausage-roll-bg.jpg";

const isMobile = ref(false);

const updateScreenWidth = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

onMounted(() => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: "center 5%",
}));
</script>
