import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offers';

export const updateCurrentCity = createAction<{newCity: City}>('updateCurrentCity');
export const updateCityOffersList = createAction('updateCityOffersList');
export const loadSortedCityOffersList = createAction<Offers>('loadSortedCityOffersList');
export const resetCityOffersList = createAction('resetCityOffersList');
export const loadOffersList = createAction<Offers>('loadOffersList');
