import { SortName } from '../types/sort';
import { SortPack } from '../const/sortpack';
import { CityPackType } from '../types/city';
import { CityPack } from '../const/citypack';

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isKnownCityName (cityName: string | undefined): cityName is keyof CityPackType {
  if (!isString(cityName)) {
    return isString(cityName);
  }

  return Object.keys(CityPack).some((city) => city === cityName);
}

function isKnownSortName (sortName: string | undefined): sortName is SortName {
  if (!isString(sortName)) {
    return isString(sortName);
  }

  return Object.keys(SortPack).some((sort) => sort === sortName);
}

export {
  isString,
  isKnownCityName,
  isKnownSortName
};
