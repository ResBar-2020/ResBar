import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#01579b',
        secondary: '#486b00',
        accent: '#7d4427',
        error: '#7d4427',
        info: '#a2c523',
        success: '#a2c523',
        warning: '#7d4427'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
});
