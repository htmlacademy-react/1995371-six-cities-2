import { TFilter } from '../types/common';
import { Offers, TOffer } from '../types/offers';
import { isString } from './type-quard';
import { FilterType } from '../const/const';

const FilterFunction = {
  [FilterType.Favorite]: () => (offer: TOffer) => offer.isFavorite,
  [FilterType.City]: (city: string) => (offer: TOffer) => offer.city.name === city
} as const;

const getFilteredOffers = <T>(
  offers: Offers,
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
  offers: Offers,
  city: string
) => getFilteredOffers<string>(offers, FilterType.City, city);

const getFavoriteOffers = (
  offers: Offers
) => getFilteredOffers(offers, FilterType.Favorite);

export {
  getFilteredOffers,
  getCityFilteredOffers,
  getFavoriteOffers
};
