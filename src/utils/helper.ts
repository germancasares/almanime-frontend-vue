import Season from '@/enums/season';

function* Chunk<T>(collection: T[], columns = 2): IterableIterator<T[]> {
  for (let index = 0; index < collection.length; index += columns) {
    yield collection.slice(index, columns + index);
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

function IsObjectEmpty(object: object) {
  return Object.entries(object).length === 0 && object.constructor === Object;
}

export default {
  Chunk,
  GetSeason,
  IsObjectEmpty,
};
