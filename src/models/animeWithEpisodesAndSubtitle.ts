import { Season } from '@/enums';
import { DateTime } from 'luxon';
import { EpisodeWithSubtitle } from '.';

export interface AnimeWithEpisodesAndSubtitle {
  slug: string;
  name: string;
  season: Season;
  startDate: DateTime;

  episodesCount: number;
  episodes: EpisodeWithSubtitle[];
}
