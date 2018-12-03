import { About } from './components';
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/about',
        name: 'about',
        component: About,
    },
];

export default routes;
