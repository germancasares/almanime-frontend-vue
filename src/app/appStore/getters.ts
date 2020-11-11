import { AppState } from './state';

const getters = {
  isAuthenticated(appState: AppState) {
    if (appState.isDarkTheme) {
      // console.log();
    }
    return false;
  },
};

export type AppGetters = typeof getters;

export default getters;
