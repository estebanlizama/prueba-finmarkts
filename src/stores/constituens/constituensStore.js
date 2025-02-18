import { defineStore } from 'pinia'
import { fetchJson } from '../jsonService'
import { InfoModel, ConstituentModel } from '@/models/ConstituentModel'

export const useConstituentsStore = defineStore('constituents', {
  state: () => ({
    info: InfoModel,
    constituents: ConstituentModel,
    selectedInstrument: null,
  }),

  actions: {
    async fetchConstituen() {
      try {
        const data = await fetchJson('constituyentes', 'constituensList')

        if (data) {
          // Transforma manualmente los datos en instancias de los modelos
          this.info = new InfoModel(data.info)
          this.constituents = data.constituents.map((item) => new ConstituentModel(item))
          console.log(data)
        }
      } catch (error) {
        console.error('Error al cargar constituyentes:', error)
      }
    },
    setSelectedInstrument(instrument) {
      this.selectedInstrument = instrument
    },
  },
})
