<template>
  <div
    class="bg-cyan-600 text-white text-center py-20 mb-10 flex flex-col justify-center h-96"
  >
    <h1 class="text-6xl font-bold mb-4">Products</h1>
    <p class="text-3xl mb-6">
      Explore the latest and greatest in our product range!
    </p>
    <div class="flex justify-center mt-4">
      <div class="flex border-2 border-white rounded">
        <input
          v-model="searchTerm"
          type="search"
          class="px-4 py-2 w-96 text-black"
          placeholder="Search for a product..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(['search']);
const searchTerm = ref("");

watch(searchTerm, (newValue) => {
  emit('search', newValue);
});
</script>
