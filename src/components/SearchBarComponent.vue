<template>
  <div class="search-bar">
    <v-autocomplete
      v-model="selectedItem"
      :items="filteredItems"
      item-title="name"
      item-value="codeInstrument"
      :placeholder="placeholder"
      dense
      solo
      hide-details
      prepend-inner-icon="mdi-magnify"
      @update:modelValue="handleSelect"
      class="search-input"
    ></v-autocomplete>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConstituentsStore } from '@/stores/constituens/constituensStore'
import { useHistoryStore } from '@/stores/history/historyStore'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Buscar instrumento',
  },
  filterKey: {
    type: String,
    default: 'name',
  },
})

const selectedItem = ref(null)
const searchQuery = ref('')

const constituentsStore = useConstituentsStore()
const historyStore = useHistoryStore()

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items
  return props.items.filter((item) =>
    item[props.filterKey].toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const emit = defineEmits(['select'])

const handleSelect = () => {
  if (selectedItem.value) {
    constituentsStore.setSelectedInstrument(selectedItem.value)
    historyStore.setselectedTypeTab(constituentsStore.info.name ?? 'IPSA')
    emit('select', selectedItem.value)
  }
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  background-color: #000;
  padding: 10px;
}

.search-input {
  width: 100%;
  background-color: #1e1e1e;
  color: white;
  border-radius: 4px;
}

::v-deep(.v-input__control) {
  background-color: #1e1e1e !important;
}

::v-deep(.v-input__control input) {
  color: white !important;
}
</style>
