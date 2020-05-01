import { RouteConfig } from 'vue-router';
import { Anime } from './components';

const routes: RouteConfig[] = [
  {
    path: '/anime/:slug',
    name: 'anime',
    component: Anime,
  },
];

export default routes;
