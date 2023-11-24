<template>
  <div
    class="bg-cyan-600 text-white text-center py-20 mb-10 flex flex-col justify-center h-96 rounded-b-corners"
  >
    <h1 class="text-8xl font-bold mb-4">Products</h1>
    <div class="flex justify-center mt-6">
      <div class="flex border-2 border-white rounded">
        <input
          v-model="searchTerm"
          type="search"
          class="px-4 py-2 w-[32rem] h-16 text-black text-2xl"
          placeholder="Search for a product..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["search"]);
const searchTerm = ref("");

watch(searchTerm, (newValue) => {
  emit("search", newValue);
});
</script>

<style>
.rounded-b-corners {
  border-bottom-left-radius: 5rem;
  border-bottom-right-radius: 5rem;
}
</style>
