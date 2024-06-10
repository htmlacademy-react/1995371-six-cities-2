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

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
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
  AppRoute,
  AuthorizationStatus
};
