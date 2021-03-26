import { routes as home } from './home';
import { routes as anime } from './anime';
import { routes as account } from './account';
import { routes as fansubView } from './fansub-view';
import { routes as fansubList } from './fansub-list';
import { routes as fansubNew } from './fansub-new';
import { routes as subtitleNew } from './subtitle-new';

export default [
    ...home,
    ...anime,
    ...account,
    ...fansubNew,
    ...fansubView,
    ...fansubList,
    ...subtitleNew,
];
