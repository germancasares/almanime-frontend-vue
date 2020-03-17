import { RouteConfig } from 'vue-router';
import { FansubView } from './components';

const routes: RouteConfig[] = [
  {
    path: '/fansub/:acronym',
    name: 'fansub-view',
    component: FansubView,
  },
];

export default routes;
