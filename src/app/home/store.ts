import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import Axios from 'axios';
import { Anime } from '@/models';
import Helper from '@/utils/helper';
import store from '@/store';

export interface IHomeState {
  currentSeason: Anime[];
}

@Module({
  name: 'Home',
  store,
  dynamic: true,
  namespaced: true,
})
class HomeModule extends VuexModule implements IHomeState {
  public currentSeason: Anime[] = [];

  @Action({ commit: 'LOAD_CURRENT_SEASON', rawError: true })
  public async GetCurrentSeason() {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const season = Helper.GetSeason(now.getMonth());

    return (await Axios.get<Anime[]>(`Anime/Year=${year}&Season=${season}`)).data;
  }

  @Mutation
  public LOAD_CURRENT_SEASON(animes: Anime[]) {
    this.currentSeason = animes;
  }
}

export default getModule(HomeModule);
