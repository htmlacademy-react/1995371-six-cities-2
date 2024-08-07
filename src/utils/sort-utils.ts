import { TCity } from '../types/city';
import { TShortOffers } from '../types/offers';
import { getCityFilteredOffers } from './filter-utils';

const SORT_OPTIONS_OPEN_CLASSNAME = 'places__options--opened';

const sortToHigherPrice = (offers: TShortOffers): TShortOffers => offers.slice().sort((currentOffer, nextOffer): number => currentOffer.price - nextOffer.price);
const sortToLowerPrice = (offers: TShortOffers): TShortOffers => offers.slice().sort((currentOffer, nextOffer): number => nextOffer.price - currentOffer.price);
const sortToLowerRating = (offers: TShortOffers): TShortOffers => offers.slice().sort((currentOffer, nextOffer): number => nextOffer.rating - currentOffer.rating);
const sortPopular = (offers: TShortOffers, city: TCity): TShortOffers => getCityFilteredOffers(offers, city.name);

const SortPack = {
  Popular: {
    Alias: 'Popular',
    Title: 'Popular',
    SortFunction: sortPopular
  },
  ToHigherPrice: {
    Alias: 'ToHigherPrice',
    Title: 'Price: low to high',
    SortFunction: sortToHigherPrice
  },
  ToLowerPrice: {
    Alias: 'ToLowerPrice',
    Title: 'Price: high to low',
    SortFunction: sortToLowerPrice
  },
  ToLowerRating: {
    Alias: 'ToLowerRating',
    Title: 'Top rated first',
    SortFunction: sortToLowerRating
  }
} as const;

const defaultSort = SortPack.Popular.Alias;

export { SORT_OPTIONS_OPEN_CLASSNAME, SortPack, defaultSort };
