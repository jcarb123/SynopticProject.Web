<template>
  <div>
    <Hero @search="handleSearch" />
    <div class="grid grid-cols-4 gap-9">
      <div v-for="product in products.products" :key="product.id">
        <ProductCard :product="product" />
      </div>
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
