import { DateTime } from 'luxon';

export interface FansubEpisode {
    animeSlug: string;
    animeName: string;
    animeCoverImage: URL | null;
    number: number;
    name: string | null;
    finishedDate: DateTime;
}
