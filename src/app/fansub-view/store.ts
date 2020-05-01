import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { Fansub, AnimeWithEpisodesAndSubtitle, FansubAnime, PaginationMeta, Pagination, FansubEpisode, FansubUser } from '@/models';

import { FansubService } from '@/services';

export interface IFansubViewState {
  fansub: Fansub;
  animes: FansubAnime[];
  episodes: FansubEpisode[];
  members: FansubUser[];
}

@Module({
  name: 'FansubView',
  store,
  dynamic: true,
  namespaced: true,
})
class FansubViewModule extends VuexModule implements IFansubViewState {
  public fansub: Fansub = {} as Fansub;
  public animes: FansubAnime[] = [];
  public episodes: FansubEpisode[] = [];
  public members: FansubUser[] = [];
  public paginationMeta = {} as PaginationMeta;
  public pagination = {} as Pagination;

  @MutationAction({ mutate: ['fansub'] })
  public async LoadFansub(acronym: string) {
    return {
      fansub: await FansubService.Get(acronym),
    };
  }

  @MutationAction({ mutate: ['animes'] })
  public async LoadCompletedAnimes(acronym: string) {
    const animesPage = await FansubService.GetCompletedAnimes(acronym);

    return {
      animes: animesPage.models,
    };
  }

  @MutationAction({ mutate: ['episodes'] })
  public async LoadCompletedEpisodes(acronym: string) {
    const episodesPage = await FansubService.GetCompletedEpisodes(acronym);

    return {
      episodes: episodesPage.models,
    };
  }

  @MutationAction({ mutate: ['members'] })
  public async LoadMembers(acronym: string) {
    const members = await FansubService.GetMembers(acronym);

    return {
      members: members,
    };
  }

  @MutationAction({ mutate: ['fansub', 'animes'] })
  public async CleanFansub() {
    return {
      fansub: {},
      animes: [],
    };
  }
}

export default getModule(FansubViewModule);
