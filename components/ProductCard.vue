<template>
  <div
    class="p-3 rounded-md bg-white h-full flex flex-col justify-between text-center bg-white shadow-lg rounded-lg h-[12rem] overflow-hidden"
    :class="{
      'transform hover:scale-105 duration-450': product.inStock,
      'opacity-40': !product.inStock,
    }"
  >
    <div :class="product.inStock ? 'bg-green-500' : 'bg-red-500'">
      <p class="text-white text-xl font-bold py-2">
        {{ product.inStock ? "In Stock" : "Out of Stock" }}
      </p>
    </div>
    <div class="flex-1 p-4 flex flex-col justify-between">
      <h3 class="font-bold text-gray-800 text-3xl mb-2">{{ product.name }}</h3>
      <p class="text-3xl">£{{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>
