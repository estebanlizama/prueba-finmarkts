<template>
  <div class="tab-container">
    <v-tabs v-model="selectedTab" class="tabs" @update:modelValue="updateSelectedTab">
      <v-tab v-for="index in indices" :key="index" :value="index">
        {{ index }}
      </v-tab>
    </v-tabs>

    <v-window v-model="selectedTab">
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
  background-color: #121212;
}

.tabs {
  background-color: #1e1e1e;
  color: white;
}
</style>
