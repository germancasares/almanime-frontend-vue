import { Anime, PaginationMeta } from '.';

export interface AnimeSeasonPage {
    meta: PaginationMeta;
    animes: Anime[];
}
