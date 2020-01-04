import { RouteConfig } from 'vue-router';
import { Register, Login, Profile } from './components';

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
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true,
        }
    },
];

export default routes;
