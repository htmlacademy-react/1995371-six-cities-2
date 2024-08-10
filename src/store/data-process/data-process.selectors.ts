import { createSelector } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../../const/store';
import { TState } from '../../types/state';
import { TShortOffers } from '../../types/offers';
import { getCityFilteredOffers } from '../../utils/filter-utils';

type TStateData = Pick<TState, StoreNameSpace.Data>;
const getCurrentCity = (state: TStateData) => state[StoreNameSpace.Data].currentCity;
const getOffers = (state: TStateData) => state[StoreNameSpace.Data].offers;

const getFavoriteOffers = (state: TStateData) => state[StoreNameSpace.Data].favoriteOffers;
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

const getCityOffers = (state: TStateData) => state[StoreNameSpace.Data].cityOffers;
const getIsCityOffers = createSelector(
  getCityOffers,
  (cityOffers) => !!cityOffers.length
);

const getNearbyOffers = (state: TStateData) => state[StoreNameSpace.Data].nearbyOffers;
const getCurrentOffer = (state: TStateData) => state[StoreNameSpace.Data].currentOffer;
const getCurrentOfferReviews = (state: TStateData) => state[StoreNameSpace.Data].currentOfferReviews;
const getCurrentSortType = (state: TStateData) => state[StoreNameSpace.Data].sortType;
const getIsLoading = (state: TStateData) => state[StoreNameSpace.Data].isLoading;
const getIsNoCurrentOffer = (state: TStateData) => state[StoreNameSpace.Data].isNoCurrentOffer;
const getIsFormDisabled = (state: TStateData) => state[StoreNameSpace.Data].isFormDisabled;

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
