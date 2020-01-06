import { Season, AnimeStatus } from '@/enums';
import { DateTime } from 'luxon';

export interface Anime {
  id: string;

  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  synopsis: string;
  startDate: DateTime;

  coverImage: URL;
  posterImage: URL;
}
