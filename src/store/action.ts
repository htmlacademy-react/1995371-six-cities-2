import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offers';
import { SortName } from '../types/sort';

export const updateCurrentCity = createAction<City>('updateCurrentCity');
export const updateSortType = createAction<SortName>('updateSortType');
export const loadOffersList = createAction<Offers>('loadOffersList');
export const updateCityOffersList = createAction('updateCityOffersList');
export const setIsloading = createAction<boolean>('setIsloading');
export const setError = createAction<string | null>('setError');
