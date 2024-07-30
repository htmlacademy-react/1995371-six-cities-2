import { createSelector } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../../const/store';
import { TState } from '../../types/state';
import { TShortOffers } from '../../types/offers';
import { getCityFilteredOffers } from '../../utils/filter-utils';

const getCurrentCity = (state: TState) => state[StoreNameSpace.Data].currentCity;
const getOffers = (state: TState) => state[StoreNameSpace.Data].offers;

const getFavoriteOffers = (state: TState) => state[StoreNameSpace.Data].favoriteOffers;
const getFavoriteCities = createSelector(
  getFavoriteOffers,
  (favoriteOffers) => new Set(favoriteOffers.map((offer) => offer.city.name))
);
const getFavoriteCityOffers = createSelector(
  [getFavoriteCities, getFavoriteOffers],
  (cities, favoriteOffers) => {
    const cityOffers = new Map<string, TShortOffers>();
    cities.forEach((city) => cityOffers.set(
      city,
      getCityFilteredOffers(favoriteOffers, city)
    ));
    return cityOffers;
  }
);

const getCityOffers = (state: TState) => state[StoreNameSpace.Data].cityOffers;
const getIsCityOffers = createSelector(
  getCityOffers,
  (cityOffers) => !!cityOffers.length
);

const getNearbyOffers = (state: TState) => state[StoreNameSpace.Data].nearbyOffers;
const getCurrentOffer = (state: TState) => state[StoreNameSpace.Data].currentOffer;
const getCurrentOfferReviews = (state: TState) => state[StoreNameSpace.Data].currentOfferReviews;
const getCurrentSortType = (state: TState) => state[StoreNameSpace.Data].sortType;
const getIsLoading = (state: TState) => state[StoreNameSpace.Data].isLoading;
const getIsNoCurrentOffer = (state: TState) => state[StoreNameSpace.Data].isNoCurrentOffer;
const getIsFormDisabled = (state: TState) => state[StoreNameSpace.Data].isFormDisabled;

export {
  getCurrentCity,
  getOffers,
  getFavoriteOffers,
  getFavoriteCities,
  getFavoriteCityOffers,
  getCityOffers,
  getIsCityOffers,
  getNearbyOffers,
  getCurrentOffer,
  getCurrentOfferReviews,
  getCurrentSortType,
  getIsLoading,
  getIsNoCurrentOffer,
  getIsFormDisabled
};
