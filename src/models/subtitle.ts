import { SubtitleStatus, SubtitleFormat } from '@/enums';
import { DateTime } from 'luxon';

export interface Subtitle {
  status: SubtitleStatus;
  format: SubtitleFormat;
  modificationDate: DateTime;
  url: URL;
}
