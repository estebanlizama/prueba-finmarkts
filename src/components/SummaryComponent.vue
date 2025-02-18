<template>
  <div class="summary-component">
    <v-tabs v-model="tab" background-color="#121212" dark>
      <v-tab value="resumen">Resumen</v-tab>
      <v-tab value="detalles">Detalles</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="resumen">
        <div class="content">
          <p class="fecha">
            <strong>Cotización:</strong> {{ resumen?.price?.datetimeLastPrice || '-' }}
          </p>

          <v-divider></v-divider>

          <div class="info-grid">
            <p>
              <strong>Último Precio:</strong>
              <strong>{{ formatPrice(resumen?.price?.lastPrice) }}</strong>
            </p>
            <p>
              <strong>Variación:</strong>
              <strong :class="getVariationClass(resumen?.price?.performanceRelative)">{{
                formatPercentage(resumen?.price?.performanceRelative)
              }}</strong>
            </p>
            <p>
              <strong>Variación Absoluta:</strong>
              <strong>{{ formatPrice(resumen?.price?.performanceAbsolute) }}</strong>
            </p>
            <p>
              <strong>Máximo 52 Semanas:</strong>
              <strong>{{ formatPrice(resumen?.price?.max52W) }}</strong>
            </p>
            <p>
              <strong>Vol. Dinero:</strong>
              <strong>{{ formatPrice(resumen?.price?.volumeMoney) }}</strong>
            </p>
            <p>
              <strong>Vol. Instrumento:</strong>
              <strong>{{ formatPrice(resumen?.price?.volumeInstrument) }}</strong>
            </p>
          </div>

          <v-divider></v-divider>

          <div class="tendencia">
            <p>
              <strong>Tendencia:</strong>
              <span :class="tendencyClass">
                <v-icon v-if="tendencyIcon" :icon="tendencyIcon"></v-icon>
              </span>
            </p>
          </div>
        </div>
      </v-window-item>

      <v-window-item value="detalles">
        <div class="content">
          <p class="fecha">
            <strong>Cotización</strong>{{ resumen?.price?.datetimeLastPrice || '-' }}
          </p>

          <v-divider></v-divider>

          <div class="info-grid">
            <p>
              <strong>MERCADO</strong> <strong>{{ resumen?.info?.marketName || '-' }}</strong>
            </p>
            <p>
              <strong>APERTURA</strong>
              <strong>{{ formatPrice(resumen?.price?.openPrice) }}</strong>
            </p>
            <p>
              <strong>CIERRE ANTERIOR</strong>
              <strong>{{ formatPrice(resumen?.price?.closePrice) }}</strong>
            </p>
            <p>
              <strong>MÁXIMO DIARIO</strong>
              <strong> {{ formatPrice(resumen?.price?.maxDay) }}</strong>
            </p>
            <p>
              <strong>MÍNIMO DIARIO</strong>
              <strong> {{ formatPrice(resumen?.price?.minDay) }}</strong>
            </p>

            <p>
              <strong>MÍNIMO 52 SEMANAS</strong>
              <strong>{{ formatPrice(resumen?.price?.min52W) }}</strong>
            </p>
            <p><strong>Variación**</strong> <strong>%</strong></p>
          </div>

          <v-divider></v-divider>

          <div class="variacion">
            <p>
              <strong>1 MES</strong
              ><strong :class="getVariationClass(resumen?.price?.pct30D)">{{
                formatPercentage(resumen?.price?.pct30D)
              }}</strong>
            </p>

            <p>
              <strong>1 AÑO</strong>
              <strong :class="getVariationClass(resumen?.price?.pctRelW52)">{{
                formatPercentage(resumen?.price?.pctRelW52)
              }}</strong>
            </p>

            <p>
              <strong>AÑO A LA FECHA</strong
              ><strong :class="getVariationClass(resumen?.price?.pctRelCY)">{{
                formatPercentage(resumen?.price?.pctRelCY)
              }}</strong>
            </p>
          </div>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { useResumenStore } from '@/stores/resumen/resumenStore'
import { tendencyClassResult, tendencyIconResult } from '@/utils/variationUtils'
import { ref, computed } from 'vue'

const resumenStore = useResumenStore()
const resumen = computed(() => resumenStore.selectedResumen || {})

const tab = ref('resumen')

const formatPrice = (value) =>
  value ? value.toLocaleString('es-CL', { minimumFractionDigits: 2 }) : '-'

const formatPercentage = (value) => (value ? `${value.toFixed(2)}%` : '-')

const getVariationClass = (value) => {
  if (!value || isNaN(value)) return ''
  return value >= 0 ? 'positive' : 'negative'
}

const tendencyClass = computed(() => {
  const tend = resumen.value?.price?.tend
  return tendencyClassResult(tend)
})

const tendencyIcon = computed(() => {
  const tend = resumen.value?.price?.tend
  return tendencyIconResult(tend)
})
</script>

<style scoped>
.summary-component {
  background: #000;
  color: white;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  min-width: 350px;
  margin-left: auto;
}

.fecha {
  text-align: center;
  font-size: 14px;
  color: #bbb;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  font-size: 14px;
}

.info-grid p {
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.tendencia p {
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.variacion p {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

@media (max-width: 768px) {
  .summary-component {
    width: 100%;
    max-width: none;
  }
}
</style>
