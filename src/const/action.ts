enum Action {
  RedirectToRoute = 'redirectToRoute',
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers',
  DataPostNewOfferReview = 'data/postNewOfferReview',
  DataFetchNearbyOffers = 'data/fetchNearbyOffers',
  DataFetchOfferScreenInfo = 'data/fetchOfferScreenInfo',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login'
}

export { Action, APIAction };
