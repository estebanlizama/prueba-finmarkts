<template>
  <v-container class="instrument-list-container">
    <v-row v-if="showList">
      <template v-if="constituentsStore.constituents.length > splitThreshold">
        <v-col cols="6">
          <v-table dense class="instrument-table">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
              </tr>
            </thead>
            <tbody>
              <InstrumentItemComponent
                v-for="instrument in firstHalf"
                :key="instrument.codeInstrument"
                :instrument="instrument"
              />
            </tbody>
          </v-table>
        </v-col>

        <v-col cols="6">
          <v-table dense class="instrument-table">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
              </tr>
            </thead>
            <tbody>
              <InstrumentItemComponent
                v-for="instrument in secondHalf"
                :key="instrument.codeInstrument"
                :instrument="instrument"
              />
            </tbody>
          </v-table>
        </v-col>
      </template>

      <template v-else>
        <v-col cols="12">
          <v-table dense class="instrument-table">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
              </tr>
            </thead>
            <tbody>
              <InstrumentItemComponent
                v-for="instrument in constituentsStore.constituents"
                :key="instrument.codeInstrument"
                :instrument="instrument"
              />
            </tbody>
          </v-table>
        </v-col>
      </template>
    </v-row>

    <p v-else class="error-message">No hay datos disponibles para este índice.</p>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useConstituentsStore } from '@/stores/constituens/constituensStore'
import InstrumentItemComponent from '@/components/InstrumentItemComponent.vue'

const props = defineProps({
  selectedIndex: {
    type: String,
    required: true,
  },
})

const constituentsStore = useConstituentsStore()
const splitThreshold = 10

const headers = [
  { text: 'Nombre', value: 'shortName' },
  { text: 'Último', value: 'lastPrice' },
  { text: 'Monto (MM)', value: 'volumeMoney' },
  { text: 'Var Día', value: 'pctDay' },
  { text: 'Var 30d', value: 'pct30D' },
  { text: 'Año Actual', value: 'pctCY' },
  { text: '12 Meses', value: 'pct1Y' },
]

const showList = computed(() => constituentsStore.info.name === props.selectedIndex)

const firstHalf = computed(() =>
  Array.isArray(constituentsStore.constituents)
    ? constituentsStore.constituents.slice(0, Math.ceil(constituentsStore.constituents.length / 2))
    : [],
)

const secondHalf = computed(() =>
  Array.isArray(constituentsStore.constituents)
    ? constituentsStore.constituents.slice(Math.ceil(constituentsStore.constituents.length / 2))
    : [],
)
</script>

<style scoped>
.instrument-list-container {
  background-color: #121212;
  padding: 16px;
  border-radius: 8px;
}

.instrument-table {
  width: 100%;
  background-color: #1e1e1e;
  color: white;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
