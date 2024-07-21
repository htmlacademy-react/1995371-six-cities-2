enum Action {
  UpdateCurrentCity = 'updateCurrentCity',
  UpdateSortType= 'updateSortType',
  LoadOffersList= 'loadOffersList',
  UpdateCityOffersList= 'updateCityOffersList',
  SetIsloading = 'setIsloading',
  SetAuthorizationStatus = 'setAuthorizationStatus',
  RedirectToRoute = 'redirectToRoute',
  LoadCurrentOffer = 'loadCurrentOffer',
  LoadCurrentOfferReviews ='loadCurrentOfferReviews',
  LoadNearbyOffers = 'loadNearbyOffers',
  SetIsFormDisabled = 'setIsFormDisabled',
  AddReviewToList = 'addReviewToList'
}

enum APIAction {
  DataFetchOffers = 'data/fetchOffers',
  DataFetchCurrentOffer = 'data/fetchCurrentOffer',
  DataFetchCurrentOfferReviews = 'data/fetchCurrentOfferReviews',
  DataFetchNearbyOffers = 'data/fetchNearbyOffers',
  DataFetchOfferScreenInfo = 'data/fetchOfferScreenInfo',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login'
}

export { Action, APIAction };
