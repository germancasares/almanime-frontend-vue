import { Anime } from '@/models/anime';
import { Pagination, PaginationMeta } from '@/models/pagination';

const state = {
  animes: [] as Array<Anime>,
  paginationMeta: {} as PaginationMeta,
  pagination: {} as Pagination,
};

export type HomeState = typeof state;

export default () => (state);
