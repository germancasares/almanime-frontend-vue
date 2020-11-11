import { ActionContext } from 'vuex';

// globalStore.ts

type State = {
  app: AppState;
}

type Mutation<S, MT extends string, P> = {
  [K in MT]: (state: S, isDarkTheme: P) => void;
}

// How can I make use of M and MT, to avoid AppMutation and AppMutationType
type ActionAugment<S, MT extends string, P> = Omit<ActionContext<S, State>, 'commit'> & {
  commit(
    key: MT,
    payload: P
  ): ReturnType<Mutation<S, MT, P>[MT]>;
}

enum AppMutationType {
  Mutation = 'MUTATION',
}

// type Mutation<MT extends string> = {
//   [K in MT]: (state: AppState, isDarkTheme: boolean) => void;
// }

// end globalStore.ts

// appStore.ts

type AppState = {
  isLoaded: boolean;
};

enum AppActionType {
  Action = 'ACTION',
}

type AppMutation = {
  [AppMutationType.Mutation](state: AppState, isDarkTheme: boolean): void;
}

type test = AppMutation;

const actions = {
  [AppActionType.Action]({ commit }: ActionAugment<AppState, AppMutation, AppMutationType>, isDarkTheme: boolean) {
    commit(AppMutationType.Mutation, isDarkTheme);
  },
};

// end appStore.ts
