import { RouteConfig } from 'vue-router';
import { Register, Login } from './components';

const routes: RouteConfig[] = [
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
];

export default routes;
