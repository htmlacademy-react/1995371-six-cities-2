enum Action {
  UpdateCurrentCity = 'updateCurrentCity',
  UpdateSortType= 'updateSortType',
  LoadOffersList= 'loadOffersList',
  UpdateCityOffersList= 'updateCityOffersList',
  SetIsloading = 'setIsloading',
  SetError= 'setError',
  SetAuthorizationStatus = 'setAuthorizationStatus'
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers'
}

export { Action, APIAction };
