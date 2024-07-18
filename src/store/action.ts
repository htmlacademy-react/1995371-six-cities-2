import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offers';
import { SortName } from '../types/sort';
import { Action } from '../const/action';

export const updateCurrentCity = createAction<City>(Action.UpdateCurrentCity);
export const updateSortType = createAction<SortName>(Action.UpdateSortType);
export const loadOffersList = createAction<Offers>(Action.LoadOffersList);
export const updateCityOffersList = createAction(Action.UpdateCityOffersList);
export const setIsloading = createAction<boolean>(Action.SetIsloading);
export const setError = createAction<string | null>(Action.SetError);
