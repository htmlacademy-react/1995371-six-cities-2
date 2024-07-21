enum Action {
  UpdateCurrentCity = 'updateCurrentCity',
  UpdateSortType= 'updateSortType',
  LoadOffersList= 'loadOffersList',
  UpdateCityOffersList= 'updateCityOffersList',
  SetIsloading = 'setIsloading',
  SetError= 'setError',
  SetAuthorizationStatus = 'setAuthorizationStatus',
  RedirectToRoute = 'redirectToRoute'
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login'
}

export { Action, APIAction };
