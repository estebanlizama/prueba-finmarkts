import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi' // Agregar Material Design Icons
import '@mdi/font/css/materialdesignicons.css' // Importar los estilos de los iconos

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Definir Material Design Icons como predeterminado
    aliases,
    sets: {
      mdi,
    },
  },
})
