import { RouteConfig } from 'vue-router';
import { SubtitleEditor } from './components';

const routes: RouteConfig[] = [
  {
    path: '/fansubs/:acronym/animes/:slug/episodes/:number/edit',
    name: 'subtitle-editor',
    component: SubtitleEditor,
  },
];

export default routes;