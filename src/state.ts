import { AppState } from '@/app/appStore/state';
import { HomeState } from '@/app/home/store/state';

export type State = {
  app: AppState;
  home: HomeState;
}
