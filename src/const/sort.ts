import { Offers } from '../types/offers';

const SORT_OPTIONS_OPEN_CLASSNAME = 'places__options--opened';

const sortToHigherPrice = (offers: Offers | []) => offers.slice().sort((currentOffer, nextOffer): number => currentOffer.price - nextOffer.price);
const sortToLowerPrice = (offers: Offers | []) => offers.slice().sort((currentOffer, nextOffer): number => nextOffer.price - currentOffer.price);
const sortToLowerRating = (offers: Offers | []) => offers.slice().sort((currentOffer, nextOffer): number => nextOffer.rating - currentOffer.rating);
const sortPopular = (offers: Offers | []) => offers;

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
