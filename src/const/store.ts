enum Action {
  RedirectToRoute = 'redirectToRoute',
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers',
  DataFetchFevoriteOffers = 'dataFetchFevoriteOffers',
  DataPostNewOfferReview = 'data/postNewOfferReview',
  DataFetchNearbyOffers = 'data/fetchNearbyOffers',
  DataFetchOfferScreenInfo = 'data/fetchOfferScreenInfo',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login'
}

enum StoreNameSpace {
  Data='DATA',
  User = 'USER'
}

export {
  Action,
  APIAction,
  StoreNameSpace
};
