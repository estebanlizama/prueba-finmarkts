<template>
  <div class="chart-container">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />

    <div class="time-buttons">
      <button
        v-for="time in timeOptions"
        :key="time.value"
        @click="fetchChartData(time.value)"
        class="time-btn"
        :class="{ active: selectedTime === time.value }"
      >
        {{ time.label }}
      </button>
      <button class="time-btn calendar-btn">
        <v-icon icon="mdi-calendar"></v-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'
import { useHistoryStore } from '@/stores/history/historyStore'
import { getChartOptions, prepareChartData } from '@/utils/chartUtils'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

const historyStore = useHistoryStore()
const selectedTime = ref('1M')

const timeOptions = ref([
  { label: '1D', value: '1D' },
  { label: '1S', value: '1S' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1A', value: '1A' },
  { label: '5A', value: '5A' },
])

const chartData = computed(() =>
  prepareChartData(historyStore.chart, historyStore.selectedTimeFrame),
)
const chartOptions = computed(() => getChartOptions(chartData.value))

const fetchChartData = async (timeFrame) => {
  selectedTime.value = timeFrame
  historyStore.setSelectedTimeFrame(timeFrame)
}
</script>

<style scoped>
.chart-container {
  background: #000;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  max-width: 900px;
}

.chart {
  width: 100%;
  max-width: 800px;
  height: auto;
}

.time-buttons {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 10px;
}

.time-btn {
  background: #1e1e1e;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.time-btn:hover {
  background: #333;
}

.time-btn.active {
  background: #003d80;
}
.calendar-btn {
  margin-left: 20px;
}
@media (max-width: 768px) {
  .chart-container {
    width: 100%;
    padding: 10px;
  }
  .chart {
    width: 100%;
  }
}
</style>
