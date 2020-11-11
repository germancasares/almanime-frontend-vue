import { Anime } from '@/models/anime';
import { ModelWithMeta, Pagination } from '@/models/pagination';
import { HomeState } from './state';

export enum HomeMutationType {
  LoadCurrentSeason = 'LOAD_CURRENT_SEASON',
  UpdatePagination = 'UPDATE_PAGINATION',
}

const mutations = {
  [HomeMutationType.LoadCurrentSeason](state: HomeState, animeSeasonPage: ModelWithMeta<Array<Anime>>) {
    state.animes = animeSeasonPage.models;

    if (animeSeasonPage.meta != null) {
      state.paginationMeta = animeSeasonPage.meta;
    }
  },
  [HomeMutationType.UpdatePagination](state: HomeState, pagination: Pagination) {
    state.pagination = pagination;
  },
};

export type HomeMutations = typeof mutations;

export default mutations;
