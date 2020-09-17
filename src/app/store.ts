import { store as home } from './home';
import { store as anime } from './anime';
import { store as account } from './account';
import { store as fansubView } from './fansub-view';
import { store as fansubList } from './fansub-list';

import { Module, VuexModule, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import Helper from '@/utils/helper';

export interface IAppState {
  isDarkTheme: boolean;
}

@Module({
  name: 'App',
  store,
  dynamic: true,
  namespaced: true,
})
class AppModule extends VuexModule implements IAppState {
  public isDarkTheme: boolean = false;

  @MutationAction({ mutate: ['isDarkTheme'] })
  public async UpdateTheme(isDarkTheme: boolean) {
    Helper.LocalStorage.Create('isDarkTheme', isDarkTheme);

    return {
      isDarkTheme,
    };
  }
}

export const app = getModule(AppModule);

export default {
  app,
  home,
  anime,
  account,
  fansubView,
  fansubList,
};
