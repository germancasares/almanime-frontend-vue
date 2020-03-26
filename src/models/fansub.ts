import { DateTime } from 'luxon';
import { FansubMembershipOption, FansubMainLanguage } from '@/enums';

export interface Fansub {
  id: string;
  creationDate: DateTime;
  acronym: string;
  fullName: string;
  logoUrl: string;
}

export interface FansubNew {
  fullName: string,
  acronym: string,
  mainLanguage: FansubMainLanguage,
  membershipOption: FansubMembershipOption,
  webpage: string,
}
