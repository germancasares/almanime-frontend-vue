import { RouteRecordRaw } from 'vue-router';

import Home from '@/app/home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

export default routes;
