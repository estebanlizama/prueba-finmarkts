<template>
  <div class="container">
    <div class="search-container">
      <SearchBarComponent
        v-if="!isLoading && !error"
        :items="constituentsStore.constituents"
        placeholder="Busca un instrumento..."
        selectPlaceholder="Selecciona un instrumento"
        @select="(instrument) => (constituentsStore.selectedInstrument = instrument)"
      />
    </div>

    <div class="history-summary">
      <div class="chart-summary">
        <HeaderComponent />
        <ChartComponent />
      </div>

      <SummaryComponent />
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
