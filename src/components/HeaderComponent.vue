<template>
  <div class="header">
    <div class="header-title">
      <h1>
        {{ resumen?.info?.name ? resumen?.info?.name + ',' : 'Sin resumen disponible' }}
        {{ resumen?.info?.countryName ?? '' }}
      </h1>
    </div>
    <div class="header-title">
      <p class="price">Índice</p>
    </div>

    <div class="header-info">
      <div class="price-column">
        <p class="price">Valor Actual</p>
        <p class="price">
          <span :class="tendencyClass">
            <v-icon v-if="tendencyIcon" :icon="tendencyIcon"></v-icon>
          </span>
          <strong>{{ resumen?.price?.lastPrice ?? '-' }}</strong>
        </p>
      </div>

      <div class="variation-row">
        <p class="variation">
          Var.% Actual
          <strong :class="priceVariationActualClass">
            {{ resumen?.price?.pctRelCY?.toFixed(2) ?? '0' }}%</strong
          >
        </p>
      </div>

      <div class="variation-row">
        <p class="variation">
          Var. Puntos Actual
          <strong :class="priceVariationPointClass">
            {{ resumen?.price?.performanceAbsolute ?? '-' }}</strong
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResumenStore } from '@/stores/resumen/resumenStore'
import { tendencyClassResult, tendencyIconResult } from '@/utils/variationUtils'

const resumenStore = useResumenStore()
const resumen = computed(() => resumenStore.selectedResumen || {})

const tendencyIcon = computed(() => {
  const tend = resumen.value?.price?.tend
  return tendencyIconResult(tend)
})

const tendencyClass = computed(() => {
  const tend = resumen.value?.price?.tend
  return tendencyClassResult(tend)
})

const priceVariationActualClass = computed(() => {
  if (!resumen.value.price) return ''
  return resumen.value.price.pctRelCY >= 0 ? 'positive' : 'negative'
})

const priceVariationPointClass = computed(() => {
  if (!resumen.value.price) return ''
  return resumen.value.price.performanceAbsolute >= 0 ? 'positive' : 'negative'
})
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 12px;
  background: #000;
  color: white;
  border-radius: 8px;
  width: 100%;
}

.header-title h1 {
  font-size: 18px;
  margin: 0;
}

.header-info {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-top: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 0;
}

.price-column,
.variation-row {
  display: flex;
  justify-content: center;
  align-items: left;
  margin-left: 10px;
}

.price,
.variation {
  font-size: 12px;
  color: #bbb;
  margin: 0;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

.neutral {
  color: #999;
}

@media (max-width: 1200px) {
  .header-info {
    flex-direction: column;
    align-items: left;
    text-align: left;
  }
}
</style>
