<template>
  <div
    class="flex p-6 bg-white shadow-lg rounded-2xl relative border border-gray-300"
  >
    <div class="flex-1 flex items-center justify-center relative py-5">
      <i :class="iconClass"></i>
      <div class="absolute inset-y-0 right-0 w-px bg-gray-300"></div>
    </div>
    <div class="flex-1 flex flex-col items-center justify-center">
      <div
        v-if="type === 'Till'"
        class="absolute top-4 right-4 flex items-center space-x-2"
      >
        <div
          class="h-6 w-6 rounded-full"
          :class="{ 'bg-[#50d750]': status, 'bg-red-500': !status }"
        ></div>
      </div>
      <div
        v-if="temperature !== null"
        :class="temperatureColorClass"
        class="text-[3rem] lg:text-[5rem] font-bold mb-2"
      >
        {{ temperature }}°C
      </div>
      <div class="text-center">
        <h3 class="text-2xl font-semibold text-gray-600">
          {{ type }} {{ number }}
        </h3>
      </div>
      <div v-if="type === 'Till'" class="mt-4">
        <VueToggles
          :modelValue="status"
          :height="30"
          :width="60"
          checkedBg="#50d750"
          uncheckedBg="lightgrey"
          @update:modelValue="updateStatus"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { VueToggles } from "vue-toggles";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    default: null,
  },
  status: {
    type: Boolean,
    default: null,
  },
  iconClass: {
    type: String,
    required: true,
  },
  temperatureColorClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:status"]);

const updateStatus = (value) => {
  emit("update:status", value);
};
</script>
