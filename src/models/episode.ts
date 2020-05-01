import { DateTime } from 'luxon';

export interface Episode {
  id: string;

  number: number;
  name: string;
  aired: DateTime | null;
  duration: number | null;
}
