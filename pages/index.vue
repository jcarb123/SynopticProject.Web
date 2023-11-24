<template>
  <div>
    <Hero @search="handleSearch" />
    <div
      v-if="products && products.products && products.products.length > 0"
      class="grid grid-cols-3 gap-10 px-7 mb-16"
    >
      <div v-for="product in products.products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-[34rem]">
      <div
        class="inline-block h-[12rem] w-[12rem] animate-spin rounded-full border-8 border-solid border-cyan-600 border-t-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <p class="text-cyan-600 text-3xl font-semibold mt-8">
        Loading products...
      </p>
    </div>
  </div>
</template>

<script setup>
const products = ref([]);

const fetchProducts = async (searchTerm = "") => {
  let url =
    "https://thamco-product-catalogue-api-test.azurewebsites.net/api/v1.0/Products";
  if (searchTerm) {
    url += `/search?SearchTerm=${searchTerm}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Fetch error:", response.statusText);
      return;
    }
    const data = await response.json();
    products.value = data;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

const handleSearch = (searchTerm) => {
  if (searchTerm.trim() === "") {
    fetchProducts();
  } else {
    fetchProducts(searchTerm);
  }
};

onMounted(fetchProducts);
</script>
