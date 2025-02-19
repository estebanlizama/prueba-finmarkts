<template>
  <div class="chart-container">
    <template v-if="chartData && chartData.labels[0] !== 'Sin datos'">
      <Line :data="chartData" :options="chartOptions" class="chart" />
    </template>
    <p v-else class="no-data-message">No hay datos disponibles en este rango de fechas.</p>

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

      <button class="time-btn calendar-btn" @click="showDatePicker = true">
        <v-icon icon="mdi-calendar"></v-icon>
      </button>

      <v-dialog v-model="showDatePicker" width="280">
        <v-card>
          <v-card-title>Seleccionar Fecha</v-card-title>
          <v-card-text>
            <v-date-picker v-model="selectedStartDate" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="applyCustomDateRange">Aplicar</v-btn>
            <v-btn @click="showDatePicker = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  Filler,
} from 'chart.js'
import { useHistoryStore } from '@/stores/history/historyStore'
import { getChartOptions, prepareChartData } from '@/utils/chartUtils'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler,
)

const historyStore = useHistoryStore()
const selectedTime = ref('1M')
const showDatePicker = ref(false)
const selectedStartDate = ref(null)

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
  prepareChartData(historyStore.chart, historyStore.selectedTimeFrame, selectedStartDate.value),
)
const chartOptions = computed(() => getChartOptions(chartData.value))

const fetchChartData = async (timeFrame) => {
  selectedTime.value = timeFrame
  selectedStartDate.value = null
  historyStore.setSelectedTimeFrame(timeFrame)
}

const applyCustomDateRange = () => {
  if (selectedStartDate.value) {
    selectedTime.value = 'custom'
    showDatePicker.value = false
  }
}
</script>

<style scoped>
.chart-container {
  background: #000;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.chart {
  width: 100%;
  max-width: 500px;
  height: 250px;
}

.time-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}

.time-btn {
  background: #1e1e1e;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 10px;
}

.time-btn:hover {
  background: #333;
}

.time-btn.active {
  background: #003d80;
}

.calendar-btn {
  margin-left: 10px;
}

.no-data-message {
  color: red;
  font-size: 10px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .chart-container {
    max-width: 100%;
    padding: 5px;
  }
  .chart {
    max-width: 100%;
    height: 200px;
  }
  .time-btn {
    padding: 3px 6px;
    font-size: 9px;
  }
}
</style>
