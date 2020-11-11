import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex';

import {
  Actions,
  Getters,
  Mutations,
  modules,
} from '@/app/store';

import { State } from '@/state';

type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  };
}

export const key: InjectionKey<VuexStore<State>> = Symbol('Vuex');

export const store = createStore({
  modules,
});

export function useStore() {
  return baseUseStore(key) as Store;
}
