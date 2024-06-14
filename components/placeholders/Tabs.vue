<template>
  <div ref="tabsContainer" class="w-full mx-auto">
    <div
      :class="[
        'relative flex justify-around items-center border-b-2 border-gray-200 bg-white',
        { 'sticky top-0 z-50': isSticky },
      ]"
    >
      <div
        v-for="(tab, index) in props.tabs"
        :key="index"
        @click="
          () => (!props.isLocked || index !== 1 ? selectTab(index) : null)
        "
        :class="[
          'py-5 px-6 text-3xl font-bold relative flex-1 text-center',
          selectedTab === index ? 'text-brand-primary-blue' : 'text-gray-600',
          index === 1 && props.isLocked
            ? 'cursor-not-allowed text-gray-600'
            : 'cursor-pointer',
        ]"
      >
        {{ tab }}
        <template v-if="index === 1">
          <i v-if="props.isLocked" class="fas fa-lock ml-2 text-gray-600"></i>
          <i
            v-else
            class="fas fa-unlock ml-2"
            :class="
              selectedTab === index
                ? 'text-brand-primary-blue'
                : 'text-gray-600'
            "
          ></i>
        </template>
      </div>
      <div
        class="absolute bottom-0 h-[0.4rem] bg-brand-primary-yellow transition-all duration-700"
        :style="underlineStyle"
      ></div>
    </div>
    <div class="mt-5">
      <slot :selectedTab="selectedTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
});

const selectedTab = ref(0);
const tabsContainer = ref(null);
const isSticky = ref(false);

const handleScroll = () => {
  if (tabsContainer.value) {
    isSticky.value = window.scrollY > tabsContainer.value.offsetTop;
  }
};

const selectTab = (index) => {
  selectedTab.value = index;
};

const underlineStyle = computed(() => {
  return {
    width: "25%",
    left: selectedTab.value === 0 ? "12.5%" : "62.5%",
  };
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

defineEmits(["update:selectedTab"]);
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
