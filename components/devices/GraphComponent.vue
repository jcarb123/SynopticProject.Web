<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const props = defineProps({
  device: Object,
  interval: {
    type: Number,
    default: 5000,
  },
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Temperature",
      backgroundColor: "#f87979",
      borderColor: "#f87979",
      data: [],
      fill: false,
      tension: 0.1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

let intervalId;

const updateChartData = () => {
  const currentTime = new Date().toLocaleTimeString();
  const newTemperature = Math.floor(Math.random() * 100);

  if (chartData.value.labels.length >= 20) {
    chartData.value.labels.shift();
    chartData.value.datasets[0].data.shift();
  }

  chartData.value.labels.push(currentTime);
  chartData.value.datasets[0].data.push(newTemperature);
};

onMounted(() => {
  intervalId = setInterval(updateChartData, props.interval);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
