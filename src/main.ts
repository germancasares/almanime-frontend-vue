import { createApp } from 'vue';
import { App } from './app';
import './registerServiceWorker';
import router from './router';

import '@mdi/font/css/materialdesignicons.css';
import { store, key } from './store';

createApp(App)
  .use(store, key)
  .use(router)
  .mount('#app');
