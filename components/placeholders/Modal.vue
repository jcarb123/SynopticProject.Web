<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center m-10"
    >
      <div class="fixed inset-0 bg-black opacity-70" @click="close"></div>
      <transition name="slide-up">
        <div
          class="bg-white w-full max-w-2xl rounded-lg shadow-lg relative transform transition-transform"
        >
          <div
            class="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-lg"
          >
            <h2
              class="text-2xl font-bold text-brand-primary-blue text-center flex-grow"
            >
              {{ title }}
            </h2>
          </div>
          <div class="p-6 overflow-y-auto max-h-96">
            <slot></slot>
          </div>
          <div
            class="sticky bottom-0 bg-white border-t p-4 flex justify-between items-center rounded-b-lg"
          >
            <button
              @click="close"
              class="bg-gray-200 text-brand-primary-blue px-8 py-3 rounded-lg hover:bg-gray-300 font-extrabold"
            >
              Back
            </button>
            <button
              :disabled="isSubmitDisabled"
              @click="apply"
              class="bg-brand-primary-blue text-white px-10 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 font-extrabold"
            >
              {{ applyButtonText }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: "Modal Title",
  },
  applyButtonText: {
    type: String,
    default: "Apply",
  },
  isSubmitDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "apply"]);

const close = () => {
  emit("close");
};

const apply = () => {
  emit("apply");
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
