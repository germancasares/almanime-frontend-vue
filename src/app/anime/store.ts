import { Module, VuexModule, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { AnimeWithEpisodes } from '@/models';
import { AnimeService } from '@/services';

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
  public anime: AnimeWithEpisodes = {
    coverImage: null,
    posterImage: null,
  } as AnimeWithEpisodes;

  @MutationAction({ mutate: ['anime']})
  public async GetAnimeBySlug(slug: string) {
    return {
      anime: await AnimeService.GetBySlug(slug),
    }
  }

  @MutationAction({ mutate: ['anime'] })
  public async CleanAnime() {
    return {
      anime: {
        coverImage: null,
        posterImage: null,
      },
    };
  }
}

export default getModule(AnimeModule);
