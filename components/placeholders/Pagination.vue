<template>
  <div class="my-4 flex justify-center">
    <div
      v-for="page in props.totalPages"
      :key="page"
      @click="goToPage(page)"
      class="mx-1 cursor-pointer"
    >
      <div
        v-show="props.totalPages! > 1"
        :class="{
          'animate-grow': props.currentPage === page,
          'animate-shrink': props.currentPage !== page,
        }"
        class="pagination-circle mt-5"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  totalPages: Number,
  currentPage: Number,
});

const emit = defineEmits(["update:currentPage"]);

const goToPage = (page) => {
  emit("update:currentPage", page);
};
</script>

<style scoped>
@keyframes grow {
  from {
    transform: scale(0.5);
    background-color: white;
    border: 2px solid #fdb71b;
  }
  to {
    transform: scale(1);
    background-color: #fdb71b;
    border: 2px solid #fdb71b;
  }
}

@keyframes shrink {
  from {
    transform: scale(1);
    background-color: #fdb71b;
    border: 2px solid #fdb71b;
  }
  to {
    transform: scale(0.5);
    background-color: white;
    border: 2px solid #fdb71b;
  }
}

.pagination-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #fdb71b;
  transition: all 0.3s ease-in-out;
}

.animate-grow {
  animation: grow 0.3s forwards;
}

.animate-shrink {
  animation: shrink 0.3s forwards;
}
</style>
