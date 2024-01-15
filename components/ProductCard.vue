<template>
  <div
    @click="toggleModal"
    class="flex flex-col items-center p-4 border-4 border-gray-200 rounded-lg cursor-pointer hover:border-amber-400"
  >
    <div class="relative mb-4 flex-shrink-0">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="object-contain h-64 w-64"
      />
    </div>
    <h3 class="text-xl font-bold mb-2 mt-[-1rem] text-sky-800 text-center">
      {{ product.name }}
    </h3>
    <h4 class="text-xl font-medium mb-2 text-gray-400">
      {{ product.calories }} kcal
    </h4>
    <h4 class="text-xl font-medium mb-5 text-black">
      £{{ product.price.toFixed(2) }}
    </h4>
    <button
      v-if="isAuthenticated"
      @click.stop="addToCart"
      class="text-black font-bold text-lg bg-amber-400 px-16 py-2 rounded-md hover:bg-yellow-400"
    >
      Add
    </button>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center px-4 py-8 z-50"
    @click="toggleModal"
  >
    <div
      class="bg-white rounded-[2.5rem] shadow-2xl relative max-w-7xl w-full h-1/2 mx-auto p-12 flex flex-col justify-center"
      @click.stop
    >
      <div class="flex flex-col lg:flex-row items-center lg:items-start h-full">
        <div class="lg:w-1/2 lg:pr-8">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="rounded-3xl w-full lg:max-w-full"
            style="height: auto; max-height: 80vh"
          />
        </div>
        <div class="mt-8 lg:mt-0 lg:w-1/2 flex flex-col justify-center h-full">
          <p
            class="text-6xl font-bold mb-7 text-sky-800 break-words ml-[-0.5rem]"
          >
            {{ product.name }}
          </p>
          <p class="text-xl mb-6 break-words">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { product, isAuthenticated } = defineProps([
  "product",
  "isAuthenticated",
]);

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const addToCart = () => {
  // Add to cart logic
};
</script>
