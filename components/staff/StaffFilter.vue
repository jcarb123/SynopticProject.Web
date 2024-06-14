<template>
  <div class="flex flex-col items-center w-full mb-8">
    <div
      class="flex flex-wrap lg:flex-nowrap md:flex-col justify-between items-center w-full max-w-[105rem] md:space-y-4"
    >
      <div class="mb-4 md:mb-0 lg:mr-4 -mt-2">
        <label
          for="roleFilter"
          class="mr-2 font-bold text-gray-600 text-xl md:text-2xl"
        >
          Filter by role:
        </label>
        <select
          id="roleFilter"
          :value="props.selectedRole"
          @change="updateSelectedRole"
          class="p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-600 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-10 cursor-pointer transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
        >
          <option value="">All</option>
          <option v-for="role in props.uniqueRoles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div
        class="flex space-x-4 mt-5 lg:mt-0 md:space-x-4 md:space-y-0 md:w-full md:justify-center"
      >
        <button
          @click="updateShowModal(true)"
          class="bg-brand-primary-blue text-white px-5 py-3 rounded-lg hover:opacity-85 text-lg md:text-xl font-bold flex items-center space-x-2"
        >
          <i class="fas fa-plus"></i>
          <span>Add</span>
        </button>
        <button
          @click="removeStaff"
          :disabled="!props.selectedStaffId"
          class="bg-brand-primary-yellow text-black px-5 py-3 rounded-lg hover:opacity-85 text-lg md:text-xl font-bold flex items-center space-x-2 disabled:opacity-50"
        >
          <i class="fas fa-trash"></i>
          <span>Remove</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  uniqueRoles: Array,
  selectedRole: String,
  showModal: Boolean,
  selectedStaffId: [String, Number, null],
});

const emit = defineEmits([
  "update:selectedRole",
  "update:showModal",
  "removeStaff",
]);

const updateSelectedRole = (event) => {
  emit("update:selectedRole", event.target.value);
};

const updateShowModal = (value) => {
  emit("update:showModal", value);
};

const removeStaff = () => {
  emit("removeStaff");
};
</script>
