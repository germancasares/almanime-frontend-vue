import { SubtitleNew } from './components';
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/fansubs/:acronym/subtitle',
        name: 'subtitle-new',
        component: SubtitleNew,
    },
];

export default routes;
