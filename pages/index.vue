<template>
  <div>
    <Hero @search="loadProducts" />
    <div
      v-if="products && products.products && products.products.length > 0"
      class="grid grid-cols-4 gap-10 px-7 mb-16"
    >
      <div v-for="product in products.products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-[34rem]">
      <div
        class="inline-block h-[12rem] w-[12rem] animate-spin rounded-full border-8 border-solid border-cyan-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        style="border-color: #00558f transparent #00558f #00558f"
        role="status"
      />
      <p class="text-3xl font-semibold mt-8" style="color: #00558f">
        Loading products...
      </p>
    </div>
  </div>
</template>

<script setup>
import { fetchProducts } from "@/services/productService";
const config = useRuntimeConfig();

const products = ref([]);

const loadProducts = async (searchTerm = "") => {
  products.value = await fetchProducts(config.public.baseUrl, searchTerm);
};

onMounted(loadProducts);
</script>
