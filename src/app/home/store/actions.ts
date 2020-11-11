import { ActionContext } from 'vuex';
import { State } from '@/state';
import Helper from '@/utils/helper';
import { DateTime } from 'luxon';
import AnimeService from '@/services/animeService';
import { Pagination } from '@/models/pagination';
import { HomeMutations, HomeMutationType } from './mutations';
import { HomeState } from './state';

export enum HomeActionType {
  GetAnimeSeasonPage = 'GET_ANIME_SEASON_PAGE',
  UpdatePagination = 'UPDATE_PAGINATION',
}

type ActionAugment = Omit<ActionContext<HomeState, State>, 'commit'> & {
  commit<K extends keyof HomeMutations>(
    key: K,
    payload: Parameters<HomeMutations[K]>[1]
  ): ReturnType<HomeMutations[K]>;
}

const actions = {
  [HomeActionType.UpdatePagination]({ commit }: ActionAugment, pagination: Pagination) {
    commit(HomeMutationType.UpdatePagination, pagination);
  },

  async [HomeActionType.GetAnimeSeasonPage](
    { commit }: ActionAugment,
    { page, includeMeta }: { page: number; includeMeta?: boolean },
  ) {
    const { year, month } = DateTime.local().toObject();
    if (year === undefined || month === undefined) throw new Error('Year or month are undefined.');

    const season = Helper.GetSeason(month);

    commit(
      HomeMutationType.LoadCurrentSeason,
      await AnimeService.GetSeason(year, season, page, includeMeta),
    );
  },
};

export type HomeActions = typeof actions;

export default actions;
