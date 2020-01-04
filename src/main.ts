import Vue from 'vue';

import { App } from './app';
import router from './router';
import store from './store';

// Design dependencies
import '@mdi/font/css/materialdesignicons.css';
import Buefy from 'buefy';

// Backend Calls
import Axios from 'axios';
Axios.defaults.baseURL = process.env.VUE_APP_APIBASEURL;

import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
