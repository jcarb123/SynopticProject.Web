<template>
  <div
    class="rounded-xl bg-white flex flex-col justify-between text-center overflow-hidden transform hover:scale-105 duration-450 border-4"
    style="height: 24rem; border-color: #fdb71b"
  >
    <div
      class="flex-1 p-5 flex flex-col justify-between hover:text-black"
      style="color: #00558f"
    >
      <div
        class="flex justify-center items-center"
        style="height: 180px"
      >
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="object-contain h-full w-full"
        />
      </div>
      <h3 class="font-bold text-3xl mb-1" style="color: #00558f; max-height: 8rem; overflow: hidden;">
        {{ product.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>