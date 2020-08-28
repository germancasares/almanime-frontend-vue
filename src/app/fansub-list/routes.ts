import { RouteConfig } from 'vue-router';
import { FansubList } from './components';

const routes: RouteConfig[] = [
  {
    path: '/fansubs',
    name: 'fansub-list',
    component: FansubList,
  },
];

export default routes;
