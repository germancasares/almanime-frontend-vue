import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { Anime } from '@/models';
import store from '@/store';
import Axios from 'axios';
import { Season, Status } from '@/enums';
import { DateTime } from 'luxon';

export interface IAnimeState {
  anime: Anime;
}

@Module({
  name: 'Anime',
  store,
  dynamic: true,
  namespaced: true,
})
class AnimeModule extends VuexModule implements IAnimeState {
  public anime: Anime = {} as Anime;

  @Action({ commit: 'LOAD_ANIME', rawError: true })
  public async GetAnimeBySlug(slug: string) {
    return (await Axios.get<Anime>(`anime/slug/${slug}`)).data;
  }

  @Mutation
  public LOAD_ANIME(anime: Anime) {
    this.anime = anime;

    // anime.startDate is string even though is defined as DateTime in Typescript.
    this.anime.startDate = DateTime.fromISO(anime.startDate.toString());
  }
}

export default getModule(AnimeModule);
