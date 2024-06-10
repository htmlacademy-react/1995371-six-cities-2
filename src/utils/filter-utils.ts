import { Filter } from '../types/common';
import { Offers, SomeOffer } from '../types/offers';

import { FilterType } from '../const';

const FilterFunction = {
  [FilterType.Favorite]: () => (offer: SomeOffer) => offer.isFavorite,
  [FilterType.City]: (city: string) => (offer: SomeOffer) => offer.city.name === city
} as const;

const getFilteredOffers = <T>(
  offers: Offers,
  filterType: Filter,
  filterTag?: T
) => offers.filter(FilterFunction[filterType](filterTag));

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
