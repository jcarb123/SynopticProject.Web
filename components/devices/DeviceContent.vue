<template>
  <div class="w-full p-4">
    <section class="mb-8">
      <h2 class="text-3xl font-bold mb-4 text-gray-600">Fridges</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DeviceCard
          v-for="device in fridges"
          :key="device.id"
          type="Fridge"
          :number="device.number"
          :temperature="device.temperature"
          iconClass="fas fa-snowflake text-[5rem] lg:text-[8rem] text-brand-primary-blue"
          temperatureColorClass="text-brand-primary-blue"
        />
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-3xl font-bold mb-4 text-gray-600">Tills</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DeviceCard
          v-for="device in tills"
          :key="device.id"
          type="Till"
          :number="device.number"
          :status="device.status"
          @update:status="device.status = $event"
          :iconClass="`fas fa-tv text-[5rem] lg:text-[8rem] ${device.status ? 'text-[#50d750]' : 'text-red-500'}`"
        />
      </div>
    </section>

    <section>
      <h2 class="text-3xl font-bold mb-4 text-gray-600">Hot Holds</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DeviceCard
          v-for="device in hotHolds"
          :key="device.id"
          type="Hot Hold"
          :number="device.number"
          :temperature="device.temperature"
          iconClass="fas fa-fire text-[5rem] lg:text-[8rem] text-[#ff773c]"
          temperatureColorClass="text-[#ff773c]"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import DeviceCard from '../devices/DeviceCard.vue';
import { ref } from 'vue';

const tills = ref([
  { id: 1, number: 1, status: true },
  { id: 2, number: 2, status: false },
  { id: 3, number: 3, status: true },
]);

const fridges = ref([
  { id: 1, number: 1, temperature: 4 },
  { id: 2, number: 2, temperature: 3 },
  { id: 3, number: 3, temperature: 5 },
]);

const hotHolds = ref([
  { id: 1, number: 1, temperature: 65 },
  { id: 2, number: 2, temperature: 70 },
  { id: 3, number: 3, temperature: 68 },
]);
</script>
