<template>
  <div class="mt-7 max-width-sm mx-auto text-center">
    <p class="mt-2 text-5xl text-sky-800 font-medium">Oops.... That wasn't supposed to happen</p>
    <p class="mt-5 text-4xl text-sky-800 font-medium">{{ error.message }}</p>
    <button
      class='mt-8 px-8 py-4 rounded text-2xl bg-sky-800 transform hover:scale-105 duration-450 text-white'
      @click="handleClearError"
    >
      View The Greggs Range!
    </button>
  </div>
</template>

<script setup>
defineProps(["error"]);

const handleClearError = () => clearError({ redirect: "/" });
</script>
