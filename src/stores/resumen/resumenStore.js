import { defineStore } from 'pinia'
import { fetchJson } from '../jsonService'
import { ResumenInfoModel, ResumenPriceModel } from '@/models/ResumenModel'

export const useResumenStore = defineStore('resumen', {
  state: () => ({
    info: null,
    price: null,
    selectedResumen: null,
  }),

  actions: {
    async fetchResumen(nombreArchivo) {
      try {
        const data = await fetchJson('resumen', nombreArchivo)

        if (data) {
          this.info = new ResumenInfoModel(data.info)
          this.price = new ResumenPriceModel(data.price)
          this.setSelectedResumen(data) // Guardar resumen completo
        }
      } catch (error) {
        console.error('Error al cargar resumen:', error)
      }
    },

    setSelectedResumen(resumen) {
      this.selectedResumen = resumen
    },
  },
})
