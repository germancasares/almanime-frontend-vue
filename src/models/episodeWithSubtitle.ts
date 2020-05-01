import { DateTime } from 'luxon';
import { Subtitle } from '.';

export interface EpisodeWithSubtitle {
  number: number;
  name: string;
  aired: DateTime | null;
  duration: number | null;

  subtitle: Subtitle;
}
