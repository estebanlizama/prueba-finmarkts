<template>
  <div class="header">
    <div class="header-title">
      <h1>
        {{ resumen?.info?.name ? resumen?.info?.name + ',' : 'Sin Resumen Asociado' }}
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
          <strong :class="priceVariationActualClass"
            >{{ resumen?.price?.pctRelCY?.toFixed(2) ?? '0' }}%</strong
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
  justify-content: center;
  padding: 16px;
  background: #000;
  color: white;
  border-radius: 8px;
  width: 100%;
}

.header-title h1 {
  font-size: 20px;
  margin: 0;
}

.header-info {
  display: flex;
  flex-direction: row;
  margin-top: 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 0;
}

.price-column,
.variation-row {
  display: flex;
  justify-content: left;
  width: 100%;
}

.price,
.variation {
  font-size: 14px;
  color: #bbb;
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
</style>
