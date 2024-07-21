import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const/citypack';
import {
  loadOffersList,
  updateCurrentCity,
  updateCityOffersList,
  updateSortType,
  setIsloading,
  setauthorizationstatus,
  loadCurrentOffer,
  loadCurrentOfferReviews,
  loadNearbyOffers,
  setIsFormDisabled,
  addReviewToList
} from './action';
import { getCityFilteredOffers } from '../utils/filter-utils';
import { TCity } from '../types/city';
import { TOfferFull, TOffers } from '../types/offers';
import { TSortName } from '../types/sort';
import { AuthorizationStatus } from '../const/const';
import { defaultSort, SortPack } from '../const/sort';
import { isKnownSortName } from '../utils/type-guard';
import { TAuthorizationStatus } from '../types/common';
import { TReviews } from '../types/reviews';

type TInitialState = {
  currentCity: TCity;
  offers: TOffers;
  cityOffers: TOffers;
  nearbyOffers: TOffers;
  currentOffer: TOfferFull | null;
  currentOfferReviews: TReviews;
  sortType: TSortName;
  isLoading: boolean;
  error: string | null;
  authorizationStatus: TAuthorizationStatus;
  isFormDisabled: boolean;
}

const initialState: TInitialState = {
  currentCity: DEFAULT_CITY,
  offers: [],
  cityOffers: [],
  nearbyOffers: [],
  currentOffer: null,
  currentOfferReviews: [],
  sortType: defaultSort,
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFormDisabled: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(updateSortType, (state, action) => {
      const currentSortType = state.sortType;
      const newSortType = action.payload;

      if(!newSortType || newSortType === currentSortType || !isKnownSortName(newSortType)) {
        return;
      }

      state.sortType = newSortType;
    })
    .addCase(updateCityOffersList, (state) => {
      switch (state.sortType) {
        case SortPack.Popular.Alias:
          state.cityOffers = getCityFilteredOffers(state.offers, state.currentCity.name);
          break;

        default:
          state.cityOffers = SortPack[state.sortType].SortFunction(state.cityOffers);
          break;
      }
    })
    .addCase(loadOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setIsloading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setauthorizationstatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadCurrentOfferReviews, (state, action) => {
      state.currentOfferReviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setIsFormDisabled, (state, action) => {
      state.isFormDisabled = action.payload;
    })
    .addCase(addReviewToList, (state, action) => {
      state.currentOfferReviews.push(action.payload);
    });
});
