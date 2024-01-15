<template>
  <div>
    <Hero @search="loadProducts" />
    <div
      v-if="isLoading"
      class="flex flex-col justify-center items-center h-[34rem]"
    >
      <div
        class="inline-block h-[12rem] w-[12rem] animate-spin rounded-full border-8 border-solid border-cyan-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        style="border-color: #00558f transparent #00558f #00558f"
        role="status"
      />
      <p class="text-3xl font-semibold mt-8 text-sky-800">
        Loading products...
      </p>
    </div>
    <div
      v-else-if="products && products.products && products.products.length > 0"
      class="grid grid-cols-4 mx-12 my-12 gap-3 mb-15"
    >
      <div v-for="product in products.products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
    <div
      v-else-if="
        productsLoaded && (!products.products || products.products.length === 0)
      "
      class="flex flex-col justify-center items-center h-[34rem]"
    >
      <p class="text-3xl font-semibold text-sky-800">
        No products found. Try again!
      </p>
    </div>
  </div>
</template>

<script setup>
import { fetchProducts } from "../services/productService";
import { onMounted, ref } from "vue";

const config = useRuntimeConfig().public;
const products = ref([]);
const isLoading = ref(false);
const productsLoaded = ref(false);

const loadProducts = async (searchTerm = "") => {
  isLoading.value = true;
  products.value = await fetchProducts(searchTerm, config);
  isLoading.value = false;
  productsLoaded.value = true;
};

onMounted(loadProducts);
</script>
