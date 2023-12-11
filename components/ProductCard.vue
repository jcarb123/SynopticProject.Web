<template>
  <div
    class="flex flex-col items-center p-4 border-4 border-gray-200 rounded-lg"
  >
    <div class="relative mb-4 flex-shrink-0">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="object-contain h-64 w-64"
      />
    </div>
    <h3 class="text-xl font-bold mb-2 mt-[-1rem] text-sky-800 text-center">
      {{ product.name }}
    </h3>
    <h4 class="text-xl font-medium mb-2 text-gray-400">
      {{ product.calories }} kcal
    </h4>
    <h4 class="text-xl font-medium mb-5 text-black">
      £{{ product.price.toFixed(2) }}
    </h4>
    <button
      v-if="!isAuthenticated"
      @click="addToCart"
      class="text-black font-bold text-lg bg-amber-400 px-16 py-2 rounded-md hover:bg-yellow-400"
    >
      Add
    </button>
  </div>
</template>

<script setup>
const { product, isAuthenticated } = defineProps([
  "product",
  "isAuthenticated",
]);
</script>
