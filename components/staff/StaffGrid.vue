<template>
  <div>
    <div
      v-if="props.paginatedStaffList.length === 0"
      class="flex flex-col items-center"
    >
      <div class="lg:hidden text-center mt-4 text-lg font-semibold">
        No staff found. Please try again later.
      </div>
      <div class="hidden lg:flex flex-col items-center">
        <RiveAnimation :animationUrl="animationUrl" class="mr-16 -mt-32 z-0" />
        <div class="mt-4 text-lg font-semibold">
          No staff found. Please try again later.
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <StaffCard
        v-for="staff in props.paginatedStaffList"
        :key="staff.id"
        :staff="staff"
        :selectedStaffId="props.selectedStaffId"
        @select="selectStaff($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RiveAnimation from "../placeholders/RiveAnimation.vue";
import StaffCard from "../staff/StaffCard.vue";

const props = defineProps({
  paginatedStaffList: Array,
  selectedStaffId: [String, Number, null],
});

const emit = defineEmits(["selectStaff"]);

const selectStaff = (id) => {
  emit("selectStaff", id);
};

const animationUrl = "../../assets/animations/hot_drink.riv";
</script>
