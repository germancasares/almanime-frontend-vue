import { RouteConfig } from 'vue-router';
import { Fansub } from './components';

const routes: RouteConfig[] = [
  {
    path: '/fansub/:acronym',
    name: 'fansub',
    component: Fansub,
  },
];

export default routes;
