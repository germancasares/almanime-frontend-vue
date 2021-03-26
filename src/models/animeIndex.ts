import { Season, AnimeStatus } from '@/enums';

export interface AnimeIndex {
  kitsuID: number;
  slug: string;
  name: string;
  season: Season;
  status: AnimeStatus;
}
