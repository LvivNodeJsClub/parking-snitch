import Vue from 'vue'
import Toast from 'vue-toasted'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// CustomPlugins
import Notification from '@/plugins/notification'

// Material UI
import VueMaterial from 'vue-material'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial);
Vue.use(Toast);
Vue.use(Notification);

Vue.config.productionip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
