import { StoreNameSpace } from '../../const/store';
import { TState } from '../../types/state';

const getCurrentCity = (state: TState) => state[StoreNameSpace.Data].currentCity;
const getOffers = (state: TState) => state[StoreNameSpace.Data].offers;
const getFavoriteOffers = (state: TState) => state[StoreNameSpace.Data].favoriteOffers;
const getCityOffers = (state: TState) => state[StoreNameSpace.Data].cityOffers;
const getNearbyOffers = (state: TState) => state[StoreNameSpace.Data].nearbyOffers;
const getCurrentOffer = (state: TState) => state[StoreNameSpace.Data].currentOffer;
const getCurrentOfferReviews = (state: TState) => state[StoreNameSpace.Data].currentOfferReviews;
const getCurrentSortType = (state: TState) => state[StoreNameSpace.Data].sortType;
const getIsLoading = (state: TState) => state[StoreNameSpace.Data].isLoading;
const getIsCityOffers = (state: TState) => state[StoreNameSpace.Data].isCityOffers;
const getIsNoCurrentOffer = (state: TState) => state[StoreNameSpace.Data].isNoCurrentOffer;
const getIsFormDisabled = (state: TState) => state[StoreNameSpace.Data].isFormDisabled;

export {
  getCurrentCity,
  getOffers,
  getFavoriteOffers,
  getCityOffers,
  getNearbyOffers,
  getCurrentOffer,
  getCurrentOfferReviews,
  getCurrentSortType,
  getIsLoading,
  getIsCityOffers,
  getIsNoCurrentOffer,
  getIsFormDisabled
};
