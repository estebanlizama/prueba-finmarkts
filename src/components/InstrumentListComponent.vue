<template>
  <v-container class="instrument-list-container">
    <v-row v-if="showList">
      <template v-if="constituentsStore.constituents.length > splitThreshold">
        <v-col cols="12" md="6">
          <v-data-table
            :headers="headers"
            :items="firstHalf"
            :sort-by="[{ key: sortBy, order: sortDesc ? 'desc' : 'asc' }]"
            class="instrument-table"
            dense
            :hide-default-footer="true"
            theme="dark"
          >
            <template v-slot:item="{ item }">
              <InstrumentItemComponent :instrument="item" />
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="12" md="6">
          <v-data-table
            :headers="headers"
            :items="secondHalf"
            :sort-by="[{ key: sortBy, order: sortDesc ? 'desc' : 'asc' }]"
            class="instrument-table"
            dense
            :hide-default-footer="true"
            theme="dark"
          >
            <template v-slot:item="{ item }">
              <InstrumentItemComponent :instrument="item" />
            </template>
          </v-data-table>
        </v-col>
      </template>

      <template v-else>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="constituentsStore.constituents"
            :sort-by="[{ key: sortBy, order: sortDesc ? 'desc' : 'asc' }]"
            class="instrument-table"
            dense
            :hide-default-footer="true"
            theme="dark"
          >
            <template v-slot:item="{ item }">
              <InstrumentItemComponent :instrument="item" />
            </template>
          </v-data-table>
        </v-col>
      </template>
    </v-row>

    <p v-else class="error-message">No hay datos disponibles para este índice.</p>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
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
  { title: 'Nombre', key: 'shortName', sortable: true },
  { title: 'Último', key: 'lastPrice', sortable: true },
  { title: 'Monto (MM)', key: 'volumeMoney', sortable: true },
  { title: 'Var Día', key: 'pctDay', sortable: true },
  { title: 'Var 30d**', key: 'pct30D', sortable: true },
  { title: 'Año Actual', key: 'pctCY', sortable: true },
  { title: '12 Meses', key: 'pct1Y', sortable: true },
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

const sortBy = ref('shortName')
const sortDesc = ref(false)
</script>

<style scoped>
.instrument-list-container {
  background-color: #000;
  width: 100%;
  padding: 10px;
}

.instrument-table {
  width: 100%;
  background-color: #000;
  color: white;
  font-size: 12px;
  min-height: 250px; /* Mantiene tamaño estable */
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
  min-height: 50px;
}

@media (max-width: 768px) {
  .instrument-table {
    font-size: 10px;
    min-height: 200px;
  }
  .error-message {
    font-size: 10px;
  }
}
</style>
