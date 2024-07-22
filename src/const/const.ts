const AVATAR_TEMP_URL = 'https://i.pravatar.cc/128';
const SHOWED_NEARBY_OFFERS_AMOUNT = 3;

const Setting = {
  OffersAmount: 5,
} as const;

const RatingStarTitle = {
  Perfect: 'perfect',
  Good: 'good',
  NotBad: 'not bad',
  Badly: 'badly',
  Terribly: 'terribly',
} as const;

const RatingStarValue = {
  [RatingStarTitle.Perfect]: 5,
  [RatingStarTitle.Good]: 4,
  [RatingStarTitle.NotBad]: 3,
  [RatingStarTitle.Badly]: 2,
  [RatingStarTitle.Terribly]: 1,
} as const;

enum PlacesListWrapperClassName {
  Main = 'cities__places-list places__list tabs__content',
  Offer = 'near-places__list places__list',
  Favorite = 'favorites__places'
}

enum AccommodationType {
  Apartment = 'Apartment',
  Room = 'Private room',
  House = 'House',
  Hotel = 'Hotel'
}

enum FilterType {
  Favorite = 'isFavorite',
  City = 'city'
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferBase = '/offer',
  Page404 = '/404'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export {
  AVATAR_TEMP_URL,
  SHOWED_NEARBY_OFFERS_AMOUNT,
  Setting,
  RatingStarTitle,
  RatingStarValue,
  PlacesListWrapperClassName,
  AccommodationType,
  FilterType,
  AppRoute,
  AuthorizationStatus
};
