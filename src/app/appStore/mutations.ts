import { AppState } from './state';

export enum AppMutationType {
  UpdateTheme = 'UPDATE_THEME',
}

const mutations = {
  [AppMutationType.UpdateTheme](state: AppState, isDarkTheme: boolean) {
    state.isDarkTheme = isDarkTheme;
  },
};

export type AppMutations = typeof mutations;

export default mutations;
