<template>
  <tr @click="selectInstrument" class="instrument-item">
    <td>{{ instrument.shortName }}</td>
    <td>{{ formatCurrency(instrument.lastPrice) }}</td>
    <td>{{ formatMillions(instrument.volumeMoney) }}</td>
    <td :class="getVariationClass(instrument.pctDay)">
      {{ formatPercentage(instrument.pctDay) }}
    </td>
    <td :class="getVariationClass(instrument.pct30D)">
      {{ formatPercentage(instrument.pct30D) }}
    </td>
    <td :class="getVariationClass(instrument.pctCY)">
      {{ formatPercentage(instrument.pctCY) }}
    </td>
    <td :class="getVariationClass(instrument.pct1Y)">
      {{ formatPercentage(instrument.pct1Y) }}
    </td>
  </tr>
</template>

<script setup>
import { useConstituentsStore } from '@/stores/constituens/constituensStore'

const props = defineProps({
  instrument: {
    type: Object,
    required: true,
  },
})

const constituentsStore = useConstituentsStore()

const selectInstrument = () => {
  constituentsStore.setSelectedInstrument(props.instrument.codeInstrument)
}

const formatCurrency = (value) => `$${value.toLocaleString()}`
const formatMillions = (value) => `${(value / 1_000_000).toFixed(2)}M`
const formatPercentage = (value) => `${value.toFixed(2)}%`

const getVariationClass = (value) => {
  return value > 0 ? 'positive' : value < 0 ? 'negative' : ''
}
</script>

<style scoped>
.instrument-item {
  cursor: pointer;
  text-align: left;
}

.instrument-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.positive {
  color: #4caf50;
}

.negative {
  color: #ff5252;
}
</style>
