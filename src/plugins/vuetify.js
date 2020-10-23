import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#41796b",
        secondary: "#2b2b2b",
        accent: "#3b3b3b",
        error: "#b71c1c"
      }
    },
    dark: true
  }
});

export default vuetify;
