import { defineStore } from 'pinia'
import { fetchJson } from '../jsonService'
import { HistoryInfoModel, HistoryChartModel } from '@/models/HistoryModel'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    info: null,
    chart: [],
    selectedTimeFrame: '1M',
    selectedTypeTab: 'IPSA',
  }),

  actions: {
    async fetchHistory(nombreArchivo) {
      try {
        const data = await fetchJson('history', `history-${nombreArchivo}`)

        if (data) {
          this.info = HistoryInfoModel.fromJson(data.info)
          this.chart = HistoryChartModel.fromJson(data.chart)
        }
      } catch (error) {
        console.error('Error al cargar history:', error)
      }
    },
    setSelectedTimeFrame(timeFrame) {
      this.selectedTimeFrame = timeFrame
    },
    setselectedTypeTab(tabName) {
      this.selectedTypeTab = tabName
    },
  },
})
