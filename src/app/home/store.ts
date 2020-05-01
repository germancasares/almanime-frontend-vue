import { Module, VuexModule, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import Axios from 'axios';
import Helper from '@/utils/helper';
import store from '@/store';
import { Anime, PaginationMeta, AnimeSeasonPage } from '@/models';

export interface IHomeState {
  animes: Anime[];
  paginationMeta: PaginationMeta;
  pagination: Pagination;
}

export interface Pagination {
  current: number;
  isLoading: boolean;
  pageSize: number;
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

    return (await Axios.get<AnimeSeasonPage>(`anime/year/${2018}/season/${season}?page=${payload.page}&includeMeta=${payload.includeMeta ?? false}`)).data;
  }

  @Mutation
  public LOAD_CURRENT_SEASON(animeSeasonPage: AnimeSeasonPage) {
    this.animes = animeSeasonPage.animes;

    if (animeSeasonPage.meta != null) {
      this.paginationMeta = animeSeasonPage.meta;
    }
  }
}

export default getModule(HomeModule);
