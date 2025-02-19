<template>
  <div class="container">
    <div class="search-container">
      <SearchBarComponent
        v-if="!isLoading && !error"
        :items="constituentsStore.constituents"
        placeholder="Busca un instrumento"
        selectPlaceholder="Selecciona un instrumento"
        @select="(instrument) => (constituentsStore.selectedInstrument = instrument)"
      />
    </div>

    <div class="main-layout">
      <!-- Sección superior con gráfico y resumen -->
      <div class="top-section">
        <div class="chart-summary">
          <HeaderComponent />
          <ChartComponent />
        </div>
        <SummaryComponent class="summary-component" />
      </div>

      <!-- Sección inferior con las tablas -->
      <div class="bottom-section">
        <TabComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
import SummaryComponent from '@/components/SummaryComponent.vue'
import ChartComponent from '@/components/ChartComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { useConstituentsStore } from '@/stores/constituens/constituensStore'
import { useResumenStore } from '@/stores/resumen/resumenStore'
import { useHistoryStore } from '@/stores/history/historyStore'
import TabComponent from '@/components/TabComponent.vue'

const constituentsStore = useConstituentsStore()
const resumenStore = useResumenStore()
const historyStore = useHistoryStore()

const isLoading = ref(true)
const error = ref(null)

const loadData = async () => {
  isLoading.value = true
  error.value = null
  const nameDefault = 'IPSA'
  try {
    await constituentsStore.fetchConstituen()
    await resumenStore.fetchResumen(nameDefault)
    await historyStore.fetchHistory(nameDefault)
  } catch (err) {
    error.value = err.message || 'Error al cargar los datos'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadData)

const validFileNames = ['AGUAS-A', 'ANDINA-B', 'BCI', 'BSANTANDER', 'CAP', 'IPSA']

watch(
  () => constituentsStore.selectedInstrument,
  async (newInstrument) => {
    if (!newInstrument || !validFileNames.includes(newInstrument)) {
      resumenStore.selectedResumen = null
      historyStore.info = null
      historyStore.chart = []
      return
    }
    await resumenStore.fetchResumen(newInstrument)
    await historyStore.fetchHistory(newInstrument)
  },
)
</script>

<style scoped>
.container {
  background-color: #000;
  color: white;
  padding: 10px;
  font-size: 12px;
  min-width: 80%;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 10px;
}

.main-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.chart-summary {
  flex: 2;
  min-width: 60%;
}

.summary-component {
  flex: 1;
  min-width: 35%;
}

.bottom-section {
  margin-top: 10px;
}

@media (max-width: 1200px) {
  .top-section {
    flex-direction: column;
    align-items: center;
  }
  .summary-component {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 5px;
  }
  .chart-summary,
  .summary-component {
    width: 100%;
  }
  .top-section {
    flex-direction: column;
  }
}
</style>
