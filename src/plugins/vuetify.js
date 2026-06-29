import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#00B4D8',
          secondary: '#FF6B35',
          background: '#0D1117',
          surface: '#161B22',
        }
      }
    }
  }
})

export default vuetify
