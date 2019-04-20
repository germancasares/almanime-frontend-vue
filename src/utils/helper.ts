import { Season } from '@/enums';

export default { Chunk, GetSeason };

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
