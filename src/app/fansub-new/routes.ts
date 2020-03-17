import { RouteConfig } from 'vue-router';
import { FansubNew } from './components';

const routes: RouteConfig[] = [
  {
    path: '/fansubs/new',
    name: 'fansub-new',
    component: FansubNew,
  },
];

export default routes;
