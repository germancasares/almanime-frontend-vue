import { Home } from './components';
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
];

export default routes;
