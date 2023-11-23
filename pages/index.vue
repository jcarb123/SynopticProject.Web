<template>
  <div>
    <Hero/>
    <div class="grid grid-cols-4 gap-9">
      <div v-for="p in products.products" :key="p.id">
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "products",
});

useHead({
  title: "ThAmCo | Products",
});

const { data: products } = await useFetch(
  "https://thamco-product-catalogue-api-test.azurewebsites.net/api/v1.0/Products"
);
</script>
