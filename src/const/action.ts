enum Action {
  UpdateCurrentCity = 'updateCurrentCity',
  UpdateSortType= 'updateSortType',
  LoadOffersList= 'loadOffersList',
  UpdateCityOffersList= 'updateCityOffersList',
  SetIsloading = 'setIsloading',
  SetAuthorizationStatus = 'setAuthorizationStatus',
  RedirectToRoute = 'redirectToRoute',
  SetIsFormDisabled = 'setIsFormDisabled',
  AddReviewToList = 'addReviewToList',
  LoadOfferInfo = 'loadOfferInfo'
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
