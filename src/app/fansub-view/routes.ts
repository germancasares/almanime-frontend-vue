import { RouteConfig } from 'vue-router';
import { FansubView } from './components';

const routes: RouteConfig[] = [
  {
    path: '/fansubs/:acronym',
    name: 'fansub-view',
    component: FansubView,
  },
];

export default routes;
