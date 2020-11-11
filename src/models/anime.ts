import { DateTime } from 'luxon';

import Season from '@/enums/season';
import AnimeStatus from '@/enums/animeStatus';

export interface Anime {
  id: string;

  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
  synopsis: string;
  startDate: DateTime;

  coverImage: URL | null;
  posterImage: URL | null;
}
