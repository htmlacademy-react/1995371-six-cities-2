/*
Создайте новый файл для описания редьюсера (например, reducer.ts). Опишите в нём:

Объект начального состояния:
  город (используется для отбора списка предложений в определённом городе)
  и список предложений по аренде.

Функцию-редьюсер.
  Она принимает в качестве параметров текущий state и действие (action).
  Результатом выполнения редьюсера станет новое состояние.
  Обратите внимание, для именования функций-редьюсеров применяются существительные.
*/

import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../mocks/city';
import { offers } from '../mocks/offers';
import { resetOffersList, updateCurrentCity, updateOffersList } from './action';
import { getCityFilteredOffers } from '../utils/filter-utils';

const initialState = {
  currentCity: DEFAULT_CITY,
  offers: getCityFilteredOffers(offers, DEFAULT_CITY.name)
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCurrentCity, (state, action) => {
      state.currentCity = action.payload.newCity;
    })
    .addCase(updateOffersList, (state, action) => {
      state.offers = action.payload.newOffers;
    })
    .addCase(resetOffersList, (state) => {
      state.offers = getCityFilteredOffers(offers, state.currentCity.name);
    });
});
