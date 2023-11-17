<template>
  <div class='card text-center'>
    <img :src='product.image' alt='product thumb' class='thumb' />
    <p class='font-bold text-gray-500 m-4 truncate'>{{ product.title }}</p>
    <NuxtLink :to='`/products/${product.id}`'>
      <p class='bg-[#00558F] text-white px-3 py-2 rounded-md text-lg my-2'>View Details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { product } = defineProps(['product']);
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
