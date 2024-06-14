<template>
  <div class="flex flex-col items-center text-gray-600 p-2 rounded-lg">
    <div
      class="flex items-center justify-center w-10 h-10 text-gray-600 bg-brand-primary-grey font-bold rounded-full mb-2 border-gray-300 border-2"
    >
      {{ props.number }}
    </div>
    <div class="text-lg font-semibold text-center">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  number: {
    type: String,
    required: true,
  },
});
</script>
