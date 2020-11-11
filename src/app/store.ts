import { AppMutations } from './appStore/mutations';
import { AppActions } from './appStore/actions';
import { AppGetters } from './appStore/getters';
import appModule from './appStore';

import { HomeMutations } from './home/store/mutations';
import { HomeActions } from './home/store/actions';
import homeModule from './home/store';

type Mutations = AppMutations & HomeMutations;
type Actions = AppActions & HomeActions;
type Getters = AppGetters;

const modules = {
  app: appModule,
  home: homeModule,
};

export {
  modules,
  Mutations,
  Actions,
  Getters,
};
