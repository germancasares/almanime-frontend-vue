import Vue from 'vue';

import { App } from './app';
import router from './router';
import store from './store';

// Design dependencies
import '@mdi/font/css/materialdesignicons.css';
import Buefy from 'buefy';

// Backend Calls
import Axios from 'axios';

// PWA
import './registerServiceWorker';

// Helpers
import helper from './utils/helper';

Axios.defaults.baseURL = process.env.VUE_APP_APIBASEURL;
Vue.config.productionTip = false;

Vue.use(Buefy);

// Check if route needs to be authorized
router.beforeEach(async (to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLogged = !!helper.Cookie.GetAccountState()?.token;
  if (requiresAuth) {
    if (isLogged) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    const isLoginOrRegister = to.name === 'login' || to.name === 'register';
    if (isLoginOrRegister && isLogged) {
      next({ name: 'home' });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
