<template>
  <div class="tab-container">
    <v-tabs v-model="selectedTab" class="tabs" @update:modelValue="updateSelectedTab">
      <v-tab v-for="index in indices" :key="index" :value="index">
        {{ index }}
      </v-tab>
    </v-tabs>

    <v-window v-model="selectedTab" class="tab-content">
      <v-window-item v-for="index in indices" :key="index" :value="index">
        <InstrumentListComponent :selectedIndex="index" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useHistoryStore } from '@/stores/history/historyStore'
import InstrumentListComponent from '@/components/InstrumentListComponent.vue'

const indices = ['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL']
const historyStore = useHistoryStore()

const selectedTab = ref(historyStore.selectedTypeTab)

const updateSelectedTab = (newTab) => {
  if (indices.includes(newTab)) {
    historyStore.setselectedTypeTab(newTab)
  }
}

watch(
  () => historyStore.selectedTypeTab,
  (newTab) => {
    if (indices.includes(newTab)) {
      selectedTab.value = newTab
    }
  },
)
</script>

<style scoped>
.tab-container {
  width: 100%;
  background-color: #000;
  padding: 5px;
}

.tabs {
  background-color: #000;
  color: white;
  font-size: 12px;
}

.v-tab {
  min-width: auto;
  padding: 4px 10px;
  font-size: 10px;
}

.tab-content {
  min-height: 250px; /* Mantiene tamaño estable */
}

@media (max-width: 768px) {
  .tabs {
    font-size: 10px;
  }
  .v-tab {
    padding: 3px 7px;
    font-size: 9px;
  }
  .tab-content {
    min-height: 200px;
  }
}
</style>
