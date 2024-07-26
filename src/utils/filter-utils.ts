import { TFilter } from '../types/common';
import { TOffers, TOffer } from '../types/offers';
import { isString } from './type-guard';
import { FilterType } from '../const/const';

const FilterFunction = {
  [FilterType.Favorite]: () => (offer: TOffer) => offer.isFavorite,
  [FilterType.City]: (city: string) => (offer: TOffer) => offer.city.name === city
} as const;

const getFilteredOffers = <T>(
  offers: TOffers,
  filterType: TFilter,
  filterTag?: T
) => {
  let filterFunction = (offer: TOffer): boolean => offer !== undefined;

  switch (filterType) {
    case FilterType.City:
      if (filterTag && isString(filterTag)) {
        filterFunction = FilterFunction[filterType](filterTag);
      }
      break;

    case FilterType.Favorite:
      filterFunction = FilterFunction[filterType]();
      break;
  }

  return offers.filter(filterFunction);
};

const getCityFilteredOffers = (
  offers: TOffers,
  city: string
) => getFilteredOffers<string>(offers, FilterType.City, city);

export {
  getFilteredOffers,
  getCityFilteredOffers
};
