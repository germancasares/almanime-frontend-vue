import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './app';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (_, __, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
