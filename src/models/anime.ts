import { Season, Status } from '@/enums';
import { DateTime } from 'luxon';
import { Episode } from '@/models';

export default interface Anime {
    id: string;
    kitsuID: number;
    slug: string;
    name: string;
    season: Season;
    status: Status;
    synopsis: string;
    startDate: DateTime;
    coverImage: URL;
    posterImage: URL;

    episodes: Episode[];
}
