import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Material UI
import VueMaterial from 'vue-material'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial);

Vue.config.productionip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
