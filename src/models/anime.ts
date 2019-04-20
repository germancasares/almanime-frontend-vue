import { Season, Status } from '@/enums';
import { DateTime } from 'luxon';

export default interface Anime {
    id: string;
    kitsuID: number;
    episodes: number;
    slug: string;
    name: string;
    season: Season;
    status: Status;
    synopsis: string;
    startDate: DateTime;
    coverImage: URL;
    posterImage: URL;
}
