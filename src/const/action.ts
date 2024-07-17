enum Action {
  UpdateCurrentCity = 'updateCurrentCity',
  UpdateSortType= 'updateSortType',
  LoadOffersList= 'loadOffersList',
  UpdateCityOffersList= 'updateCityOffersList',
  SetIsloading = 'setIsloading',
  SetError= 'setError',
  SetAuthorizationStatus = 'setAuthorizationStatus',
  RedirectToRoute = 'redirectToRoute',
  LoadCurrentOffer = 'loadCurrentOffer'
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers',
  DataFetchCurrentOffer = 'data/fetchCurrentOffer',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login'
}

export { Action, APIAction };
