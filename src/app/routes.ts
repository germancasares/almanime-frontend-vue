import { routes as home } from './home';
import { routes as anime } from './anime';
import { routes as account } from './account';
import { routes as fansub } from './fansub';
import { routes as subtitleEditor } from './fansub/subtitleEditor';

export default [...home, ...anime, ...account, ...fansub, ...subtitleEditor];
