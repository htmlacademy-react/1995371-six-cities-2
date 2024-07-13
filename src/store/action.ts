import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offers';
import { SortName } from '../types/sort';

export const updateCurrentCity = createAction<{newCity: City}>('updateCurrentCity');
export const updateCityOffersList = createAction('updateCityOffersList');
export const loadOffersList = createAction<Offers>('loadOffersList');
export const updateSortType = createAction<{newSort: SortName}>('updateSortType');
