import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import "./font_awesome/font-awesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
