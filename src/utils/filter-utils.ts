import { TFilter } from '../types/common';
import { TShortOffers, TShortOffer } from '../types/offers';
import { isString } from './type-guard';
import { FilterType } from '../const/const';

const FilterFunction = {
  [FilterType.Favorite]: () => (offer: TShortOffer) => offer.isFavorite,
  [FilterType.City]: (city: string) => (offer: TShortOffer) => offer.city.name === city
} as const;

const getFilteredOffers = <T>(
  offers: TShortOffers,
  filterType: TFilter,
  filterTag?: T
) => {
  let filterFunction = (offer: TShortOffer): boolean => offer !== undefined;

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
  offers: TShortOffers,
  city: string
) => getFilteredOffers<string>(offers, FilterType.City, city);

export {
  getFilteredOffers,
  getCityFilteredOffers
};
