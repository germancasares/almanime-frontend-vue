import { ActionContext } from 'vuex';
import { State } from '@/state';
import { AppMutations, AppMutationType } from './mutations';
import { AppState } from './state';

export enum AppActionType {
  UpdateTheme = 'UPDATE_THEME',
}

type ActionAugment = Omit<ActionContext<AppState, State>, 'commit'> & {
  commit<K extends keyof AppMutations>(
    key: K,
    payload: Parameters<AppMutations[K]>[1]
  ): ReturnType<AppMutations[K]>;
}

const actions = {
  [AppActionType.UpdateTheme]({ commit }: ActionAugment, isDarkTheme: boolean) {
    commit(AppMutationType.UpdateTheme, isDarkTheme);
  },
};

export type AppActions = typeof actions;

export default actions;
