import { Module, VuexModule, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import Helper from '@/utils/helper';
import store from '@/store';
import { Anime, PaginationMeta, ModelWithMeta, Pagination } from '@/models';
import { AnimeService } from '@/services';

export interface IHomeState {
  animes: Anime[];
  paginationMeta: PaginationMeta;
  pagination: Pagination;
}

@Module({
  name: 'Home',
  store,
  dynamic: true,
  namespaced: true,
})
class HomeModule extends VuexModule implements IHomeState {
  public animes = [] as Anime[];
  public paginationMeta = {} as PaginationMeta;
  public pagination = {} as Pagination;

  @MutationAction({ mutate: ['pagination'] })
  public async UpdatePagination(pagination: Pagination) {
    return {
      pagination,
    };
  }

  @Action({ commit: 'LOAD_CURRENT_SEASON', rawError: true })
  public async GetAnimeSeasonPage(payload: { page: number, includeMeta?: boolean }) {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const season = Helper.GetSeason(now.getMonth());

    return await AnimeService.GetSeason(year, season, payload.page, payload.includeMeta);
  }

  @Mutation
  public LOAD_CURRENT_SEASON(animeSeasonPage: ModelWithMeta<Anime[]>) {
    this.animes = animeSeasonPage.models;

    if (animeSeasonPage.meta != null) {
      this.paginationMeta = animeSeasonPage.meta;
    }
  }
}

export default getModule(HomeModule);
