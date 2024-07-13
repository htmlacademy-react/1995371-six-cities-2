import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../mocks/city';
import { loadOffersList, resetCityOffersList, updateCurrentCity, updateCityOffersList, loadSortedCityOffersList } from './action';
import { getCityFilteredOffers } from '../utils/filter-utils';
import { City } from '../types/city';
import { Offers } from '../types/offers';

type InitialState = {
  currentCity: City;
  offers: [] | Offers;
  cityOffers: [] | Offers;
  nearbyOffers: [] | Offers;
  currentOffer: null;
}

const initialState: InitialState = {
  currentCity: DEFAULT_CITY,
  offers: [],
  cityOffers: [],
  nearbyOffers: [],
  currentOffer: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCurrentCity, (state, action) => {
      state.currentCity = action.payload.newCity;
    })
    .addCase(updateCityOffersList, (state) => {
      state.cityOffers = getCityFilteredOffers(state.offers, state.currentCity.name);
    })
    .addCase(loadSortedCityOffersList, (state, action) => {
      state.cityOffers = action.payload;
    })
    .addCase(resetCityOffersList, (state) => {
      state.cityOffers = getCityFilteredOffers(state.offers, state.currentCity.name);
    })
    .addCase(loadOffersList, (state, action) => {
      state.offers = action.payload;
    });
});
