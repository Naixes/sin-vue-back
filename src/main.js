import Vue from "vue";
import Demo from "./demo.vue";
import plugins from './plugins'

Vue.config.productionTip = false;

Vue.use(plugins)

new Vue({
  render: h => h(Demo)
}).$mount("#app");