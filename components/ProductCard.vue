<template>
  <div
    class="p-3 rounded-xl bg-white h-full flex flex-col justify-between text-center h-[22rem] overflow-hidden transform hover:scale-105 duration-450 border-4"
    style="border-color: #FDB71B"
  >
    <div class="flex-1 p-4 flex flex-col justify-between hover:text-black" style="color: #00558F">
      <h3 class="font-bold text-3xl mb-2" style="color: #00558F">{{ product.name }}</h3>
      <div class="flex justify-center items-center mb-2" style="height: 70%; max-height: 200px;">
        <img :src="product.imageUrl" :alt="product.name" class="object-contain h-full">
      </div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>
