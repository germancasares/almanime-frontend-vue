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

// Check if route needs to be authorized
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.User.account.token) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
