import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(require("vue-cookies"));
Vue.$cookies.config("7d");

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
