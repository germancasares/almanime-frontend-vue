import { Season, AnimeCoverSize, AnimePosterSize } from '@/enums';
import { remove, get, set } from 'es-cookie';
import { DateTime } from 'luxon';
import { IAccountState } from '@/app/account/store';

const ACCOUNTSTATECOOKIE = 'accountState';

export default {
  Chunk,
  GetSeason,
  StringToDateTime,
  IsObjectEmpty,
  ResizeImageOrDefault,
  Cookie: {
    GetAccountState,
    Create: CreateCookie,
    Delete: DeleteCookie,
    ACCOUNTSTATECOOKIE,
  },
  LocalStorage: {
    Create: CreateLocalStorage,
    Get: GetLocalStorage,
    Delete: DeleteLocalStorage,
  },
};

function* Chunk<T>(collection: T[], columns = 2): IterableIterator<T[]> {
  for (let index = 0; index < collection.length; index += columns) {
    yield collection.slice(index, columns + index);
  }
}

function GetSeason(month: number | DateTime): Season {

  if (month instanceof DateTime) {
    month = month.month;
  }

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

// #region Cookie

export interface ICookie {
  expiration: DateTime;
}

function CreateCookie(name: string, cookie: ICookie): void {
  set(name, JSON.stringify(cookie), {
    expires: cookie.expiration.toJSDate(),
    sameSite: 'strict',
  });
}

function DeleteCookie(name: string): void {
  remove(name, { sameSite: 'strict' });
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

// #endregion

// #region LocalStorage

function CreateLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function GetLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);

  if (item === null) {
    return null;
  }

  return JSON.parse(item);
}

function DeleteLocalStorage(key: string) {
  localStorage.removeItem(key);
}

// #endregion

function StringToDateTime(date: string): DateTime {
  return DateTime.fromISO(date, { zone: 'utc' });
}

function IsObjectEmpty(object: object) {
  return Object.entries(object).length === 0 && object.constructor === Object;
}

function ResizeImageOrDefault(image: URL | null, size: AnimeCoverSize | AnimePosterSize) {
  return image === null ? null : `${image.toString()}${size}.jpg`;
}
