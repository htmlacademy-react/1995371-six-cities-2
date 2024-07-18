import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const/citypack';
import { loadOffersList, updateCurrentCity, updateCityOffersList, updateSortType, setIsloading, setError } from './action';
import { getCityFilteredOffers } from '../utils/filter-utils';
import { City } from '../types/city';
import { Offers } from '../types/offers';
import { SortName } from '../types/sort';
import { defaultSort, SortPack } from '../const/sort';
import { isKnownSortName } from '../utils/type-quard';

type InitialState = {
  currentCity: City;
  offers: [] | Offers;
  cityOffers: [] | Offers;
  nearbyOffers: [] | Offers;
  currentOffer: null;
  sortType: SortName;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  currentCity: DEFAULT_CITY,
  offers: [],
  cityOffers: [],
  nearbyOffers: [],
  currentOffer: null,
  sortType: defaultSort,
  isLoading: false,
  error: null
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
