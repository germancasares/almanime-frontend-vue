import { Season } from '@/enums';
import { remove, get, set } from 'es-cookie';
import { DateTime } from 'luxon';
import { IAccountState } from '@/app/account/store';

const ACCOUNTSTATECOOKIE = 'accountState';

export default {
  Chunk,
  GetSeason,
  StringToDateTime,
  Cookie: {
    GetAccountState,
    Create,
    Delete,
    ACCOUNTSTATECOOKIE,
  },
};

function* Chunk<T>(collection: T[], size = 2): IterableIterator<T[]> {
  for (let index = 0; index < collection.length; index += size) {
    yield collection.slice(index, size + index);
  }
}

function GetSeason(month: number): Season {
  switch (true) {
    case month === 12 || month <= 2:
      return Season.Winter;
    case month >= 3 && month <= 5:
      return Season.Spring;
    case month >= 6 && month <= 8:
      return Season.Summer;
    case month >= 9 && month <= 11:
      return Season.Fall;
    default: throw new RangeError('Month out of valid range.');
  }
}

export interface ICookie {
  expiration: DateTime;
}

function Create(name: string, cookie: ICookie): void {
  set(name, JSON.stringify(cookie), {
    expires: cookie.expiration.toJSDate(),
  });
}

function Delete(name: string): void {
  remove(name);
}

function GetCookie<T>(name: string): T | null {
  const cookie = get(name);

  if (cookie === undefined) {
    return null;
  }

  return JSON.parse(cookie);
}

interface IAccountStateFlattened {
  username: string;
  token: string;
  expiration: string;
  avatarUrl: string;
}

// Because we have to know what types we are de-flattening on the get methods,
// My solution here is to know beforehand what I am de-flattening
function GetAccountState(): IAccountState | null {
  const cookie = GetCookie<IAccountStateFlattened>(ACCOUNTSTATECOOKIE);

  if (cookie === null) {
    return null;
  }

  return {
    username: cookie.username,
    token: cookie.token,
    expiration: StringToDateTime(cookie.expiration),
  };
}

function StringToDateTime(date: string): DateTime {
  return DateTime.fromISO(date, { zone: 'utc' });
}
