import { DateTime } from 'luxon';

export interface FansubAnime {
    slug: string;
    name: string;
    coverImage: URL | null;
    finishedDate: DateTime;
}
