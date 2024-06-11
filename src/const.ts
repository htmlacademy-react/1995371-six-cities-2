const AVATAR_TEMP_URL = 'https://i.pravatar.cc/128';

const Setting = {
  OffersAmount: 5,
} as const;

const AccommodationType = {
  Apartment: 'Apartment',
  Room: 'Private room',
  House: 'House',
  Hotel: 'Hotel'
} as const;

const FilterType = {
  Favorite: 'isFavorite',
  City: 'city'
} as const;

const PlaceCardModeOption = {
  Default: 'default',
  Favorite: 'favorite'
} as const;

const HeaderModeOption = {
  LoginScreen: 'loginScreen',
  Default: 'default'
} as const;

const RatingViewModeOption = {
  Card: 'place-card',
  Offer: 'offer',
  Reviews: 'reviews'
} as const;

const BookmarkButtonModeOption = {
  Card: 'place-card',
  Offer: 'offer',
} as const;

const PriceViewModeOption = {
  Card: 'place-card',
  Offer: 'offer',
} as const;

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferBase = '/offer/'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

const RatingStarTitle = {
  Perfect: 'perfect',
  Good: 'good',
  NotBad: 'not bad',
  Badly: 'badly',
  Terribly: 'terribly',
} as const;

// enum RatingStarInfo {
//   Perfect = 'perfect',
//   Good = 'good',
//   NotBad = 'not bad',
//   Badly = 'badly',
//   Terribly = 'terribly',
// }

// const RatingStarValue = {
//   'perfect': 5,
//   'good': 4,
//   'not bad': 3,
//   'badly': 2,
//   'terribly': 1,
// } as const;

const RatingStarValue = {
  [RatingStarTitle.Perfect]: 5,
  [RatingStarTitle.Good]: 4,
  [RatingStarTitle.NotBad]: 3,
  [RatingStarTitle.Badly]: 2,
  [RatingStarTitle.Terribly]: 1,
} as const;

export {
  AVATAR_TEMP_URL,
  Setting,
  AccommodationType,
  FilterType,
  PlaceCardModeOption,
  HeaderModeOption,
  RatingViewModeOption,
  BookmarkButtonModeOption,
  PriceViewModeOption,
  AppRoute,
  AuthorizationStatus,
  RatingStarTitle,
  RatingStarValue
};
