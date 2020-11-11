import Season from '@/enums/season';
import { Anime } from '@/models/anime';
import { ModelWithMeta } from '@/models/pagination';

export default class AnimeService {
  public static async GetSeason(
    year: number,
    season: Season,
    page: number,
    includeMeta = false,
  ): Promise<ModelWithMeta<Anime[]>> {
    if (process.env.NODE_ENV === 'development') {
      return {} as ModelWithMeta<Anime[]>;
    }

    throw new Error('Not implemented');
  }
}
