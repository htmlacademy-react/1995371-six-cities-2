const AVATAR_TEMP_URL = 'https://i.pravatar.cc/128';

const Setting = {
  OffersAmount: 5,
} as const;

const AccommodationType = {
  Apartment: 'apartment',
  PrivateRoom: 'room',
  House: 'house',
  Hotel: 'hotel'
} as const;

const PlaceCardModeOption = {
  Default: 'default',
  Favorite: 'favorite'
} as const;

const FilterType = {
  Favorite: 'isFavorite',
  City: 'city'
} as const;

const HeaderModeOption = {
  LoginScreen: 'loginScreen',
  Default: 'default'
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

export {
  AVATAR_TEMP_URL,
  Setting,
  AccommodationType,
  PlaceCardModeOption,
  FilterType,
  HeaderModeOption,
  AppRoute,
  AuthorizationStatus
};
