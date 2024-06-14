<template>
  <div class="flex flex-col items-center flex-grow w-full bg-gray-100">
    <div class="w-full bg-white py-6 border-b-2 border-gray-200">
      <div
        class="flex flex-wrap justify-center space-x-0 md:space-x-14 space-y-4 md:space-y-1"
      >
        <InstructionItem
          number="1"
          class="flex-1 min-w-[200px] max-w-[300px] text-center"
        >
          View and manage <br />
          colleagues
        </InstructionItem>
        <InstructionItem
          number="2"
          class="flex-1 min-w-[200px] max-w-[300px] text-center"
        >
          Select a colleague <br />
          from the list below
        </InstructionItem>
        <InstructionItem
          number="3"
          class="flex-1 min-w-[200px] max-w-[300px] text-center"
        >
          Switch to the device <br />section
        </InstructionItem>
        <InstructionItem
          number="4"
          class="flex-1 min-w-[200px] max-w-[300px] text-center"
        >
          Monitor till statuses and <br />
          food storage temperatures
        </InstructionItem>
        <InstructionItem
          number="5"
          class="flex-1 min-w-[200px] max-w-[300px] text-center"
        >
          Receive real-time <br />
          temperature alerts
        </InstructionItem>
      </div>
    </div>
    <Tabs
      :tabs="['Staff', 'Devices']"
      :isLocked="!selectedStaffId"
      @update:selectedTab="selectedTab = $event"
    >
      <template #default="{ selectedTab }">
        <transition name="fade" mode="out-in">
          <div
            v-if="selectedTab === 0"
            key="staff"
            class="w-full py-4 px-8 flex-grow"
          >
            <!-- Staff Content -->
            <StaffFilter
              class="px-6"
              :uniqueRoles="uniqueRoles"
              :selectedRole="selectedRole"
              @update:selectedRole="selectedRole = $event"
              :showModal="showModal"
              @update:showModal="showModal = $event"
              :selectedStaffId="selectedStaffId"
              @removeStaff="removeStaff"
            />
            <Modal
              :show="showModal"
              title="Add New Colleague"
              applyButtonText="Add Colleague"
              :isSubmitDisabled="isSubmitDisabled"
              @close="handleCloseModal"
              @apply="addColleague"
            >
              <div>
                <label class="block mb-2">
                  Enter colleague name:
                  <input
                    v-model="newStaff.name"
                    type="text"
                    required
                    class="mt-1 p-2 w-full border-2 rounded-md mb-5 focus:outline-none focus:border-brand-primary-yellow focus:ring focus:ring-brand-primary-yellow focus:ring-opacity-10"
                    placeholder="e.g. John Smith"
                  />
                </label>
                <label class="block mb-2">
                  Select colleague role:
                  <select
                    v-model="newStaff.role"
                    required
                    class="mt-1 p-2 w-full border-2 rounded-md cursor-pointer focus:outline-none focus:border-brand-primary-yellow focus:ring focus:ring-brand-primary-yellow focus:ring-opacity-10"
                  >
                    <option value="" disabled>Select Role</option>
                    <option
                      v-for="role in uniqueRoles"
                      :key="role"
                      :value="role"
                    >
                      {{ role }}
                    </option>
                  </select>
                </label>
              </div>
            </Modal>
            <StaffGrid
              :paginatedStaffList="paginatedStaffList"
              :selectedStaffId="selectedStaffId"
              @selectStaff="selectedStaffId = $event"
            />
            <Pagination
              :totalPages="totalPages"
              :currentPage="currentPage"
              @update:currentPage="currentPage = $event"
            />
          </div>
          <div
            v-else-if="selectedTab === 1"
            key="devices"
            class="w-full p-4 flex-grow -mt-5"
          >
            <!-- Device Content -->
            <DeviceContent />
          </div>
        </transition>
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from "~/components/placeholders/Tabs.vue";
import StaffFilter from "~/components/staff/StaffFilter.vue";
import Modal from "~/components/placeholders/Modal.vue";
import StaffGrid from "~/components/staff/StaffGrid.vue";
import Pagination from "~/components/placeholders/Pagination.vue";
import InstructionItem from "~/components/placeholders/InstructionItem.vue";
import DeviceContent from "@/components/devices/DeviceContent.vue";
import { useStaffManagement } from "@/composables/useStaffManagement";

const {
  showModal,
  newStaff,
  selectedStaffId,
  selectedRole,
  currentPage,
  uniqueRoles,
  totalPages,
  paginatedStaffList,
  isSubmitDisabled,
  addColleague,
  handleCloseModal,
  removeStaff,
} = useStaffManagement();

const selectedTab = ref(0);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
