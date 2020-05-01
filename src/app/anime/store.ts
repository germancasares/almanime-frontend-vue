import { Module, VuexModule, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import Axios from 'axios';
import { AnimeWithEpisodes } from '@/models';
import Helper from '@/utils/helper';

export interface IAnimeState {
  anime: AnimeWithEpisodes;
}

@Module({
  name: 'Anime',
  store,
  dynamic: true,
  namespaced: true,
})
class AnimeModule extends VuexModule implements IAnimeState {
  public anime: AnimeWithEpisodes = {} as AnimeWithEpisodes;

  @Action({ commit: 'LOAD_ANIME', rawError: true })
  public async GetAnimeBySlug(slug: string) {
    return (await Axios.get<AnimeWithEpisodes>(`anime/slug/${slug}`)).data;
  }

  @Mutation
  public LOAD_ANIME(anime: AnimeWithEpisodes) {
    this.anime = anime;

    // anime.startDate is string even though is defined as DateTime in Typescript.
    this.anime.startDate = Helper.StringToDateTime(anime.startDate.toString());

    // The same for the episode.aired DateTimes.
    this.anime.episodes.forEach(
      (episode) =>
        episode.aired = episode.aired !== null
          ? Helper.StringToDateTime(episode.aired.toString())
          : episode.aired,
    );
  }

  @MutationAction({ mutate: ['anime'] })
  public async CleanAnime() {
    return {
      anime: {},
    };
  }
}

export default getModule(AnimeModule);
