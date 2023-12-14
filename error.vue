<template>
  <div class="mt-7 max-width-sm mx-auto text-center">
    <p class="mt-2 text-5xl text-gray-500 font-medium">
      Oops.... That wasn't supposed to happen
    </p>
    <p class="mt-5 text-4xl text-gray-500 font-medium">{{ error.message }}</p>
    <img
      src="https://www.greggs.co.uk/images/error-img.png"
      class="mx-auto h-96 mt-10"
    />
    <button
      class="mt-5 px-8 py-4 rounded text-2xl bg-sky-800 transform hover:scale-105 duration-450 text-white"
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
