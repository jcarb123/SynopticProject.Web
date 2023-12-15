<template>
  <div>
    <Hero @search="loadProducts" />
    <div
      v-if="products && products.products && products.products.length > 0"
      class="grid grid-cols-4 mx-12 my-12 gap-3 mb-15"
    >
      <div v-for="product in products.products" :key="product.id">
        <ProductCard :product="product" :isAuthenticated="isAuthenticated" />
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-[34rem]">
      <div
        class="inline-block h-[12rem] w-[12rem] animate-spin rounded-full border-8 border-solid border-cyan-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        style="border-color: #00558f transparent #00558f #00558f"
        role="status"
      />
      <p class="text-3xl font-semibold mt-8 text-sky-800">
        Loading products...
      </p>
    </div>
  </div>
</template>

<script setup>
import { fetchProducts } from "@/services/productService";
import { useAuth0 } from "@auth0/auth0-vue";

const config = useRuntimeConfig().public;
const products = ref([]);

const auth0 = process.client ? useAuth0() : undefined;

const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value;
});

const loadProducts = async (searchTerm = "") => {
  products.value = await fetchProducts(searchTerm, config);
};

onMounted(loadProducts);
</script>
