import { DateTime } from 'luxon';

export interface Fansub {
  id: string;
  creationDate: DateTime;
  acronym: string;
  fullName: string;
  logoUrl: string;
}
