<template>
  <div
    class="card flex flex-col justify-between text-center bg-white shadow-lg rounded-lg h-96"
    :class="{
      'transition duration-300 transform hover:scale-105': product.inStock,
    }"
  >
    <div :class="product.inStock ? 'bg-green-500' : 'bg-red-500'">
      <p class="text-white text-2xl font-bold py-1">
        {{ product.inStock ? "In Stock" : "Out of Stock" }}
      </p>
    </div>
    <div class="flex-1 p-3 flex flex-col justify-center">
      <div class="h-30 overflow-hidden">
        <h3 class="font-bold text-gray-700 text-3xl">{{ product.name }}</h3>
      </div>
      <p class="text-3xl mt-4">£{{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>
