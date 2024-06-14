<template>
  <div class="relative w-full cursor-pointer" @click="selectCard">
    <div
      class="p-4 flex items-center justify-center rounded-3xl shadow-sm border-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
      :class="{
        'border-brand-primary-blue bg-white': isSelected,
        'bg-white': !isSelected,
      }"
      style="height: 150px"
    >
      <div
        class="text-center text-3xl font-bold rounded-full h-24 w-24 flex items-center justify-center text-brand-primary-blue -ml-5"
        :class="{
          'bg-brand-primary-blue text-white': isSelected,
          'bg-brand-primary-grey': !isSelected,
        }"
      >
        {{ initials }}
      </div>
      <div class="ml-6 flex flex-col items-start">
        <p class="text-2xl font-bold">{{ staff.name }}</p>
        <p class="text-xl">{{ staff.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Howl } from "howler";
// import alert from "@/assets/sounds/alert.wav";
import { computed } from "vue";

interface Staff {
  id: number;
  name: string;
  role: string;
}

const props = withDefaults(
  defineProps<{
    staff: Staff;
    selectedStaffId: number | null;
  }>(),
  {
    selectedStaffId: null,
  }
);

const emit = defineEmits(["select"]);

const isSelected = computed(() => props.staff.id === props.selectedStaffId);

const selectCard = () => {
  if (isSelected.value) {
    emit("select", null);
  } else {
    emit("select", props.staff.id);
  }

  // const sound = new Howl({
  //   src: [alert],
  //   volume: 0.2,
  // });

  // sound.play();
};

const initials = computed(() => {
  const names = props.staff.name.split(" ");
  return names.map((n) => n[0]).join("");
});
</script>
