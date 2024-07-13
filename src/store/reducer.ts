import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../mocks/city';
import { loadOffersList, updateCurrentCity, updateCityOffersList, updateSortType } from './action';
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
}

const initialState: InitialState = {
  currentCity: DEFAULT_CITY,
  offers: [],
  cityOffers: [],
  nearbyOffers: [],
  currentOffer: null,
  sortType: defaultSort
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCurrentCity, (state, action) => {
      state.currentCity = action.payload.newCity;
    })
    .addCase(updateSortType, (state, action) => {
      const currentSortType = state.sortType;
      const newSortType = action.payload.newSort;

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
    });
});
