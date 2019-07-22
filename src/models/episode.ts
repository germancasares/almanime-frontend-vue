import { DateTime } from 'luxon';

export default interface Episode {
  id: string;
  number: number;
  name: string;
  aired: DateTime;
  duration: number;
}
