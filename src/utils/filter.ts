import { DateTime } from 'luxon';
import { EpisodeWithSubtitle } from '@/models';
import { SubtitleStatus } from '@/enums';

export {
    DateFull,
    DateTimeFull,
    FinishedRecount,
    Domain,
};

const DateFull = (date: DateTime): string | null => date == null ? '' : date.toLocaleString(DateTime.DATE_FULL);

const DateTimeFull = (date: DateTime): string | null => date.toLocaleString(DateTime.DATETIME_FULL);

const FinishedRecount = (episodes: EpisodeWithSubtitle[]): number =>
    episodes.filter((e) => e.subtitle.status === SubtitleStatus.Published).length;

const Domain = (url: URL): string => url.hostname.replace('www.', '');
