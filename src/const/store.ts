enum Action {
  RedirectToRoute = 'redirectToRoute',
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers',
  DataFetchFavoriteOffers = 'data/FetchFevoriteOffers',
  DataSetOfferFavoriteStatus = 'data/setOfferFavoriteStatus',
  DataPostNewOfferReview = 'data/postNewOfferReview',
  DataFetchNearbyOffers = 'data/fetchNearbyOffers',
  DataFetchOfferScreenInfo = 'data/fetchOfferScreenInfo',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login'
}

enum StoreNameSpace {
  Data='data',
  User = 'user'
}

export {
  Action,
  APIAction,
  StoreNameSpace
};
